

// sources/streak_checkin.move
module streak_checkin::streak_system;
    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::clock::{Self, Clock};
    use sui::event;
    use std::string::{Self, String};
    use sui::display;
    use sui::package;
    use sui::url::{Self, Url};

    // ====== Constants ======
    const STREAK_TARGET: u64 = 30;
    const ONE_DAY_MS: u64 = 86400000; // 24 hours in milliseconds

// ====== Error Codes ======
const EAlreadyCheckedInToday: u64 = 1;
    const EStreakNotCompleted: u64 = 2;
    const EAlreadyClaimedReward: u64 = 3;
    const EStreakBroken: u64 = 4;

    // ====== Structs ======

    /// One-time witness for the module
    struct STREAK_SYSTEM has drop {}

    /// User's streak data
    struct UserStreak has key, store {
        id: UID,
        owner: address,
        current_streak: u64,
        last_checkin_time: u64,
        total_checkins: u64,
        reward_claimed: bool,
        created_at: u64,
    }

    /// NFT reward for completing 30-day streak
    struct StreakNFT has key, store {
        id: UID,
        name: String,
        description: String,
        image_url: Url,
        streak_count: u64,
        completion_date: u64,
        owner: address,
    }

    /// Admin capability for managing the system
    struct AdminCap has key, store {
        id: UID,
    }

    /// Registry to track all user streaks
    struct StreakRegistry has key {
        id: UID,
        total_users: u64,
        total_rewards_claimed: u64,
    }

    // ====== Events ======

    struct CheckInEvent has copy, drop {
        user: address,
        current_streak: u64,
        timestamp: u64,
    }

    struct StreakBrokenEvent has copy, drop {
        user: address,
        lost_streak: u64,
        timestamp: u64,
    }

    struct RewardClaimedEvent has copy, drop {
        user: address,
        nft_id: ID,
        timestamp: u64,
    }

    // ====== Init Function ======

    fun init(otw: STREAK_SYSTEM, ctx: &mut TxContext) {
        // Create and transfer admin capability
        let admin_cap = AdminCap {
            id: object::new(ctx),
        };
        transfer::transfer(admin_cap, tx_context::sender(ctx));

        // Create streak registry
        let registry = StreakRegistry {
            id: object::new(ctx),
            total_users: 0,
            total_rewards_claimed: 0,
        };
        transfer::share_object(registry);

        // Create Display for NFT
        let publisher = package::claim(otw, ctx);

        let keys = vector[
            string::utf8(b"name"),
            string::utf8(b"description"),
            string::utf8(b"image_url"),
            string::utf8(b"project_url"),
            string::utf8(b"creator"),
        ];

        let values = vector[
            string::utf8(b"{name}"),
            string::utf8(b"{description}"),
            string::utf8(b"{image_url}"),
            string::utf8(b"https://yourplatform.com"),
            string::utf8(b"Your Platform Name"),
        ];

        let mut display = display::new_with_fields<StreakNFT>(
        &publisher,
        keys,
        values,
        ctx
        );

        display::update_version(&mut display);
        transfer::public_transfer(publisher, tx_context::sender(ctx));
        transfer::public_transfer(display, tx_context::sender(ctx));
    }

    // ====== Public Entry Functions ======

    /// Create a new streak tracker for a user
    public entry fun create_streak(
        registry: &mut StreakRegistry,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let user_address = tx_context::sender(ctx);
        let current_time = clock::timestamp_ms(clock);

        let streak = UserStreak {
            id: object::new(ctx),
            owner: user_address,
            current_streak: 0,
            last_checkin_time: 0,
            total_checkins: 0,
            reward_claimed: false,
            created_at: current_time,
        };

        registry.total_users = registry.total_users + 1;
        transfer::transfer(streak, user_address);
    }

    /// User checks in daily
    public entry fun check_in(
        streak: &mut UserStreak,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let user_address = tx_context::sender(ctx);
        let current_time = clock::timestamp_ms(clock);

        // Verify ownership
        assert!(streak.owner == user_address, 0);

        // Check if already checked in today
        let time_since_last = current_time - streak.last_checkin_time;
        assert!(time_since_last >= ONE_DAY_MS, EAlreadyCheckedInToday);

        // Check if streak is broken (more than 48 hours since last check-in)
        if (streak.last_checkin_time > 0 && time_since_last > (ONE_DAY_MS * 2)) {
            // Streak broken - emit event and reset
            event::emit(StreakBrokenEvent {
                user: user_address,
                lost_streak: streak.current_streak,
                timestamp: current_time,
            });

            streak.current_streak = 0;
        };

        // Update streak
        streak.current_streak = streak.current_streak + 1;
        streak.total_checkins = streak.total_checkins + 1;
        streak.last_checkin_time = current_time;

        // Emit check-in event
        event::emit(CheckInEvent {
            user: user_address,
            current_streak: streak.current_streak,
            timestamp: current_time,
        });
    }

    /// Claim NFT reward after completing 30-day streak
    public entry fun claim_reward(
        streak: &mut UserStreak,
        registry: &mut StreakRegistry,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let user_address = tx_context::sender(ctx);

        // Verify ownership
        assert!(streak.owner == user_address, 0);

        // Check if streak target is met
        assert!(streak.current_streak >= STREAK_TARGET, EStreakNotCompleted);

        // Check if reward hasn't been claimed
        assert!(!streak.reward_claimed, EAlreadyClaimedReward);

        let current_time = clock::timestamp_ms(clock);

        // Create NFT reward
        let nft = StreakNFT {
            id: object::new(ctx),
            name: string::utf8(b"30-Day Streak Champion"),
            description: string::utf8(b"Congratulations on completing a 30-day check-in streak! This NFT represents your dedication and consistency."),
            image_url: url::new_unsafe_from_bytes(b"https://your-nft-image-url.com/streak-champion.png"),
            streak_count: streak.current_streak,
            completion_date: current_time,
            owner: user_address,
        };

        let nft_id = object::id(&nft);

        // Mark reward as claimed
        streak.reward_claimed = true;

        // Update registry
        registry.total_rewards_claimed = registry.total_rewards_claimed + 1;

        // Emit reward claimed event
        event::emit(RewardClaimedEvent {
            user: user_address,
            nft_id,
            timestamp: current_time,
        });

        // Transfer NFT to user
        transfer::transfer(nft, user_address);
    }

    /// Reset streak to allow claiming another reward (admin only)
    public entry fun reset_streak_for_new_reward(
        _: &AdminCap,
        streak: &mut UserStreak,
    ) {
        streak.reward_claimed = false;
        streak.current_streak = 0;
    }

    // ====== View Functions ======

    /// Get user's current streak count
    public fun get_current_streak(streak: &UserStreak): u64 {
        streak.current_streak
    }

    /// Get user's total check-ins
    public fun get_total_checkins(streak: &UserStreak): u64 {
        streak.total_checkins
    }

    /// Check if user is eligible for reward
    public fun is_eligible_for_reward(streak: &UserStreak): bool {
        streak.current_streak >= STREAK_TARGET && !streak.reward_claimed
    }

    /// Get last check-in time
    public fun get_last_checkin_time(streak: &UserStreak): u64 {
        streak.last_checkin_time
    }

    /// Check if reward has been claimed
    public fun has_claimed_reward(streak: &UserStreak): bool {
        streak.reward_claimed
    }

    /// Get NFT details
    public fun get_nft_details(nft: &StreakNFT): (String, String, u64, u64) {
        (nft.name, nft.description, nft.streak_count, nft.completion_date)
    }

    // ====== Test-only Functions ======

    #[test_only]
    public fun init_for_testing(ctx: &mut TxContext) {
        init(STREAK_SYSTEM {}, ctx);
    }

    #[test_only]
    public fun create_streak_for_testing(
        registry: &mut StreakRegistry,
        clock: &Clock,
        ctx: &mut TxContext
    ): UserStreak {
        let user_address = tx_context::sender(ctx);
        let current_time = clock::timestamp_ms(clock);

        registry.total_users = registry.total_users + 1;

        UserStreak {
            id: object::new(ctx),
            owner: user_address,
            current_streak: 0,
            last_checkin_time: 0,
            total_checkins: 0,
            reward_claimed: false,
            created_at: current_time,
        }
    }
