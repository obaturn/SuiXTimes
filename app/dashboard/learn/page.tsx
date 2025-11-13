"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Code,
  Play,
  FileText,
  Award,
  CheckCircle,
  ChevronRight,
  ExternalLink,
  Download,
  PlayCircle,
  Clock,
  Users,
  Star
} from 'lucide-react';

const Learn = () => {
  const [activeTab, setActiveTab] = useState('tutorials');
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [codePreview, setCodePreview] = useState<{ title: string; code: string; language: string } | null>(null);
  const [videoPreview, setVideoPreview] = useState<{ title: string; videoUrl: string; description: string } | null>(null);
  const [quizModal, setQuizModal] = useState<{ lessonId: string; lessonTitle: string } | null>(null);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [docViewer, setDocViewer] = useState<{ title: string; content: string; url: string } | null>(null);
  const [learningProgress, setLearningProgress] = useState({
    beginner: 0,
    developer: 0,
    advanced: 0
  });
  const [curriculumProgress, setCurriculumProgress] = useState<{
    [key: string]: { [moduleId: string]: boolean }
  }>({
    beginner: {},
    developer: {},
    advanced: {}
  });
  const [activePath, setActivePath] = useState<string | null>(null);

  const updateProgress = (track: keyof typeof learningProgress, increment: number) => {
    setLearningProgress(prev => ({
      ...prev,
      [track]: Math.min(100, prev[track] + increment)
    }));
  };

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('sui-learning-progress');
    const savedCurriculum = localStorage.getItem('sui-curriculum-progress');
    if (savedProgress) {
      setLearningProgress(JSON.parse(savedProgress));
    }
    if (savedCurriculum) {
      setCurriculumProgress(JSON.parse(savedCurriculum));
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sui-learning-progress', JSON.stringify(learningProgress));
  }, [learningProgress]);

  useEffect(() => {
    localStorage.setItem('sui-curriculum-progress', JSON.stringify(curriculumProgress));
  }, [curriculumProgress]);

  const startTutorial = (tutorialIndex: number) => {
    setActiveLesson(tutorialIndex);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (activeLesson !== null && currentStep < tutorials[activeLesson].content.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTutorial = () => {
    if (activeLesson !== null) {
      // For now, just update progress for beginner track as example
      updateProgress('beginner', 20);
      setActiveLesson(null);
      setCurrentStep(0);
    }
  };

  const backToLearn = () => {
    setActiveLesson(null);
    setCurrentStep(0);
  };

  // Quiz data - in production, this would be loaded from JSON files
  const quizData = {
    "move-language-basics": {
      title: "Move Language Basics Quiz",
      questions: [
        {
          id: "q1",
          type: "multiple-choice",
          question: "What is the primary purpose of the Move programming language?",
          options: ["Web development", "Smart contract security", "Data analysis", "Game development"],
          correctAnswer: 1,
          explanation: "Move was designed specifically for smart contract security and resource management"
        },
        {
          id: "q2",
          type: "multiple-choice",
          question: "Which ability allows an object to be stored on-chain as a top-level resource?",
          options: ["copy", "drop", "store", "key"],
          correctAnswer: 3,
          explanation: "The 'key' ability enables objects to exist as top-level resources on the Sui blockchain"
        },
        {
          id: "q3",
          type: "true-false",
          question: "Move supports inheritance like object-oriented languages",
          correctAnswer: false,
          explanation: "Move does not support inheritance; it uses composition and resource-oriented programming"
        },
        {
          id: "q4",
          type: "multiple-choice",
          question: "What does the 'mut' keyword indicate in Move?",
          options: ["A global variable", "A mutable reference", "A constant value", "A public function"],
          correctAnswer: 1,
          explanation: "'mut' indicates that a reference can be modified"
        },
        {
          id: "q5",
          type: "multiple-choice",
          question: "Which command initializes a new Sui Move project?",
          options: ["sui move init", "sui move new", "sui create project", "sui init move"],
          correctAnswer: 1,
          explanation: "'sui move new <project_name>' creates a new Move project"
        },
        {
          id: "q6",
          type: "true-false",
          question: "Modules in Move can contain both structs and functions",
          correctAnswer: true,
          explanation: "Move modules are containers for types (structs) and functions"
        },
        {
          id: "q7",
          type: "multiple-choice",
          question: "What is the purpose of the Move.toml file?",
          options: ["Store compiled bytecode", "Manage dependencies and metadata", "Define function signatures", "Store test cases"],
          correctAnswer: 1,
          explanation: "Move.toml manages package metadata, dependencies, and addresses"
        },
        {
          id: "q8",
          type: "multiple-choice",
          question: "Which of these is NOT a primitive type in Move?",
          options: ["u64", "bool", "address", "string"],
          correctAnswer: 3,
          explanation: "String is not a primitive type in Move; it's a struct from the standard library"
        }
      ]
    }
  };

  const startQuiz = (lessonId: string, lessonTitle: string) => {
    setQuizModal({ lessonId, lessonTitle });
  };

  const closeQuiz = () => {
    setQuizModal(null);
  };

  const copyToClipboard = async (text: string, exampleTitle: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(exampleTitle);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const openCodePreview = (example: any) => {
    setCodePreview({
      title: example.title,
      code: example.fullCode || example.code || 'Code not available',
      language: example.language
    });
  };

  const openVideoPreview = (example: any) => {
    if (example.videoUrl) {
      setVideoPreview({
        title: example.title,
        videoUrl: example.videoUrl,
        description: example.description
      });
    }
  };

  const downloadCode = (example: any) => {
    const codeContent = example.fullCode || example.code || 'Code not available';
    const blob = new Blob([codeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${example.title.toLowerCase().replace(/\s+/g, '_')}.move`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const checkPrerequisites = (pathId: string): boolean => {
    const path = learningPaths.find(p => p.id === pathId);
    if (!path || !path.prerequisites.length) return true;

    return path.prerequisites.every(prereqId => learningProgress[prereqId as keyof typeof learningProgress] === 100);
  };

  const completeCurriculumModule = (pathId: string, moduleId: string) => {
    setCurriculumProgress(prev => ({
      ...prev,
      [pathId]: {
        ...prev[pathId],
        [moduleId]: true
      }
    }));

    // Update overall path progress
    const path = learningPaths.find(p => p.id === pathId);
    if (path) {
      const completedModules = Object.values(curriculumProgress[pathId] || {}).filter(Boolean).length + 1;
      const newProgress = Math.round((completedModules / path.curriculum.length) * 100);
      updateProgress(pathId as keyof typeof learningProgress, newProgress - learningProgress[pathId as keyof typeof learningProgress]);
    }
  };

  const isModuleUnlocked = (pathId: string, moduleIndex: number): boolean => {
    if (moduleIndex === 0) return true; // First module always unlocked

    const path = learningPaths.find(p => p.id === pathId);
    if (!path) return false;

    // Check if previous module is completed
    const prevModule = path.curriculum[moduleIndex - 1];
    return curriculumProgress[pathId]?.[prevModule.id] || false;
  };

  const startLearningPath = (pathId: string) => {
    if (!checkPrerequisites(pathId)) {
      alert('Please complete the prerequisite learning paths first!');
      return;
    }
    setActivePath(pathId);
  };

  const backToPaths = () => {
    setActivePath(null);
  };

  const openDocumentation = (doc: any) => {
    setDocViewer({
      title: doc.title,
      content: doc.content || getDocumentationContent(doc.title),
      url: doc.link
    });
  };

  const closeDocumentation = () => {
    setDocViewer(null);
  };

  const getDocumentationContent = (title: string): string => {
    const docs: { [key: string]: string } = {
      "Official Sui Documentation": `
        <h2>🚀 Welcome to Sui Documentation</h2>
        <p>The official documentation for Sui blockchain development.</p>

        <h3>Getting Started</h3>
        <p>Sui is a layer-1 blockchain that uses the Move programming language. It features:</p>
        <ul>
          <li><strong>Object-Centric Model</strong>: Everything is an object with unique ownership</li>
          <li><strong>Parallel Execution</strong>: Transactions can execute in parallel for high throughput</li>
          <li><strong>Move Language</strong>: Safe and secure smart contract programming</li>
        </ul>

        <h3>Key Concepts</h3>
        <h4>Objects</h4>
        <p>In Sui, objects are the basic units of storage. Each object has:</p>
        <ul>
          <li>A unique ID</li>
          <li>A type that defines its structure</li>
          <li>An owner (address, another object, or shared)</li>
          <li>A version number</li>
        </ul>

        <h4>Transactions</h4>
        <p>Sui transactions are atomic operations that can:</p>
        <ul>
          <li>Create new objects</li>
          <li>Transfer object ownership</li>
          <li>Call functions on objects</li>
          <li>Delete objects</li>
        </ul>
      `,
      "Move Language Reference": `
        <h2>📚 Move Language Reference</h2>
        <p>Comprehensive guide to the Move programming language used in Sui.</p>

        <h3>Language Features</h3>
        <ul>
          <li><strong>Resource-Oriented</strong>: Values have ownership and cannot be copied implicitly</li>
          <li><strong>Type Safe</strong>: Strong static typing prevents runtime errors</li>
          <li><strong>Modular</strong>: Code is organized into modules with clear interfaces</li>
        </ul>

        <h3>Basic Syntax</h3>
        <h4>Modules</h4>
        <pre><code>module my_addr::my_module {
    // Module contents
}</code></pre>

        <h4>Structs</h4>
        <pre><code>public struct MyStruct has key {
    id: UID,
    value: u64,
}</code></pre>

        <h4>Functions</h4>
        <pre><code>public fun create_object(value: u64, ctx: &mut TxContext) {
    let obj = MyStruct {
        id: object::new(ctx),
        value,
    };
    transfer::transfer(obj, tx_context::sender(ctx));
}</code></pre>
      `,
      "Sui RPC API": `
        <h2>🔗 Sui RPC API Reference</h2>
        <p>Complete API reference for interacting with Sui nodes.</p>

        <h3>Core Methods</h3>
        <h4>Get Object</h4>
        <pre><code>curl -X POST https://fullnode.mainnet.sui.io:443 \\
  -H 'Content-Type: application/json' \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "sui_getObject",
    "params": ["0x..."]
  }'</code></pre>

        <h4>Execute Transaction</h4>
        <pre><code>curl -X POST https://fullnode.mainnet.sui.io:443 \\
  -H 'Content-Type: application/json' \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "sui_executeTransactionBlock",
    "params": ["transaction_bytes", "signature"]
  }'</code></pre>

        <h3>Available Endpoints</h3>
        <ul>
          <li><code>sui_getObject</code> - Get object details</li>
          <li><code>sui_getObjectsOwnedByAddress</code> - Get address objects</li>
          <li><code>sui_executeTransactionBlock</code> - Execute transactions</li>
          <li><code>sui_getTotalTransactionBlocks</code> - Get transaction count</li>
        </ul>
      `,
      "Best Practices": `
        <h2>✨ Sui Development Best Practices</h2>
        <p>Guidelines for writing secure and efficient Sui smart contracts.</p>

        <h3>Security</h3>
        <ul>
          <li><strong>Access Control</strong>: Always validate caller permissions</li>
          <li><strong>Input Validation</strong>: Check all inputs for validity</li>
          <li><strong>Overflow Protection</strong>: Use safe math operations</li>
          <li><strong>Test Coverage</strong>: Write comprehensive unit tests</li>
        </ul>

        <h3>Performance</h3>
        <ul>
          <li><strong>Minimize Storage</strong>: Use efficient data structures</li>
          <li><strong>Batch Operations</strong>: Group related operations</li>
          <li><strong>Gas Optimization</strong>: Minimize computational complexity</li>
        </ul>

        <h3>Code Quality</h3>
        <ul>
          <li><strong>Clear Naming</strong>: Use descriptive variable and function names</li>
          <li><strong>Modular Design</strong>: Separate concerns into different modules</li>
          <li><strong>Documentation</strong>: Comment complex logic</li>
          <li><strong>Error Handling</strong>: Provide meaningful error messages</li>
        </ul>
      `
    };

    return docs[title] || `<h2>${title}</h2><p>Documentation content coming soon...</p>`;
  };

  const tutorials = [
    {
      title: "Move Language Basics",
      description: "Learn the fundamentals of Move programming language",
      duration: "2 hours",
      level: "Beginner",
      lessons: 8,
      icon: <Code className="w-6 h-6" />,
      content: [
        {
          title: "Learn Sui Move in 15 Minutes",
          content: `<p><em>Fast-track tutorial to get started with Sui Move programming</em></p>

<div style="position:relative;width:100%;paddingBottom:56.25%;height:0;overflow:hidden;">
  <iframe src="https://www.youtube.com/embed/uLvWkp6wBkk?list=PLwSqiyXKVkfVA5TXrPvnUXM6d07_zw8Ot" title="02 Learn Sui Move in 15 Minutes" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen style="position:absolute;top:0;left:0;width:100%;height:100%;">
  </iframe>
</div>

<p>You want to learn Sui Move and start building really fast. I know what you are! You're a developer who doesn't have time for sentiments and wants to get shipping, especially since you've heard Move is easy peasy.</p>

<p>This article will teach you everything you need to know to build and publish your first Sui smart contracts (programs) on the blockchain.</p>

<h2>Packages</h2>

<p>You write programs that are grouped into packages to run on-chain. Every published package has an address. You can interact with packages by sending transactions that call the functions.</p>

<p>Before we get our hands dirty, go to this article and follow the steps to set up Sui on your computer.</p>

<p>Once you're all set up, execute this command to create your first Sui project:</p>`,
          code: `sui move new impatience`
        },
        {
          title: "Package Structure",
          content: `<p>Now, enter into the directory and open it in your code editor of choice.</p>`,
          code: `cd impatience
code .`
        },
        {
          title: "Package Manifest (Move.toml)",
          content: `<p>The <code>Move.toml</code> file is the manifest. It contains the package's details and dependencies in TOML format, with different sections for each.</p>

<p>In the [package] section, you'll define the package name (<code>impatient</code>) and the language edition (<code>2024.beta</code>). The [dependencies] section would have the external packages, e.g., the Sui package.</p>

<p>Named addresses go under [addresses] to assign aliases like <code>zsh = "0x0"</code> to onchain addresses for easier referencing in Move code. Optional sections like [dev-dependencies] and [dev-addresses] allow you to customize test environments.</p>`,
          code: `[package]
name = "impatience"
edition = "2024.beta"

[dependencies]
Sui = { git = "https://github.com/MystenLabs/sui.git", subdir = "crates/sui-framework/packages/sui-framework", rev = "framework/testnet" }

[addresses]
impatience = "0x0"`
        },
        {
          title: "Addresses and Accounts",
          content: `<p>Addresses are unique identifiers on the Sui blockchain. Sui uses addresses to identify packages, accounts, and objects.</p>

<p>On Sui, addresses are case-sensitive, have a fixed byte size of 32 bytes, and are usually represented as hexadecimal with the <code>0x</code> prefix.</p>

<p>Sui differentiates between account addresses and contract addresses by using the package name at the end of the address.</p>

<p>Some addresses are reserved for identifying standard packages and objects.</p>`,
          code: `// Example addresses
let user_address: address = @0x1234567890abcdef;
let system_address: address = @0x0;`
        },
        {
          title: "Transactions",
          content: `<p>Transactions are "actions" on the blockchain, such as calling functions, sending coins, or updating data. They can be anything that adds to or changes the state of data on the chain.</p>

<p>Every transaction includes:</p>
<ul>
<li><strong>Sender</strong> – the account that signs and sends it</li>
<li><strong>Commands</strong> – the list of actions to run, in order</li>
<li><strong>Inputs</strong> – values or objects used in the commands</li>
<li><strong>Gas</strong> – a coin used to pay for the transaction</li>
<li><strong>Gas budget/price</strong> – how much will you pay to get it onchain?</li>
</ul>

<p>Transactions return the transaction digest, status, and details like what changes, the cost, and events.</p>`,
          code: `// Publishing a package
sui client publish --gas-budget 100000000`
        },
        {
          title: "Objects",
          content: `<p>On Sui, everything is an object. The objects are stored directly on the user accounts for full control.</p>

<p>These are the types of addresses:</p>
<ul>
<li><strong>Owned Objects</strong>: Owned objects, like your tokens and NFTs, have one owner. Only the owner can use and interact with them.</li>
<li><strong>Shared Objects</strong>: These have multiple owners, e.g, liquidity pools.</li>
<li><strong>Immutable Objects</strong>: They cannot be modified once they're initialized.</li>
</ul>

<p>Every Sui object has:</p>
<ul>
<li><strong>ID</strong>: A unique identifier.</li>
<li><strong>Type</strong>: Defines what kind of object it is.</li>
<li><strong>Owner</strong>: Who owns the object (an address, another object, or shared).</li>
<li><strong>Version</strong>: Tracks changes to the object.</li>
<li><strong>Last Transaction</strong>: The most recent transaction that modified the object.</li>
</ul>

<p>You can add custom fields to objects to add features or new data.</p>`,
          code: `public struct Counter has key {
    id: UID,
    value: u64,
}`
        },
        {
          title: "Move Modules",
          content: `<p>Modules are how you manage units of your packages. You can use them to isolate similar functionality.</p>

<p>You'll declare modules using lowercase and snake case. Module names must be unique throughout the package.</p>`,
          code: `module state::impatient;
module state::patient;`
        },
        {
          title: "Data Structures and Types",
          content: `<p>Primitive types are your everyday data types. Sui Move supports:</p>
<ul>
<li><code>u8</code>, <code>u16</code>, <code>u32</code>, <code>u64</code>, <code>u128</code>, <code>u256</code> – Unsigned integers of various sizes.</li>
<li><code>bool</code> – <code>true</code> or <code>false</code>.</li>
<li><code>address</code> – Sui addresses.</li>
</ul>`,
          code: `// Variable declarations
let a: u8 = 255;
let b: u64 = 1000000;
let is_active: bool = true;
let user: address = @0x123;`
        },
        {
          title: "Structs",
          content: `<p>Structs are how you declare custom types for whatever you're building. You'll declare a struct with the <code>struct</code> keyword with the name of the type and add fields.</p>

<p>Structs are also private by default. You'll need to make them public with the <code>public</code> visibility modifier.</p>

<p>Move structs have abilities that define their behaviours:</p>
<ul>
<li><code>copy</code> – can be copied.</li>
<li><code>drop</code> – can be destroyed.</li>
<li><code>store</code> – can be stored in memory.</li>
<li><code>key</code> – can live on the blockchain as an object.</li>
</ul>`,
          code: `public struct Artist has store {
    name: String,
    age: u16,
}

struct Counter has key {
    value: u64,
}`
        },
        {
          title: "Functions and Methods",
          content: `<p>You have functions for defining reusable logic. You'll declare them in Move modules.</p>

<p>Functions can take in parameters and return values.</p>

<p>You can write functions operating on structs as methods by making the struct the first parameter.</p>`,
          code: `fun greet(): String {
    string::utf8(b"Hello, Sui!")
}

fun add(a: u64, b: u64): u64 {
    a + b
}

public fun heal(self: &mut Hero) {
    self.health = self.health + 10;
}`
        },
        {
          title: "Conclusion",
          content: `<p>You've learnt the basics of Sui Move, enough for you to get your hands dirty. You're now a Sui developer.</p>

<p>Next is an advanced variant of this article where we'll delve into smart contract specifics to help you build your first project.</p>

<h3>🎥 Watch the Complete Tutorial Video</h3>
<p>Now that you've read through all the concepts, watch this comprehensive video that explains everything you just learned:</p>

<div style="background:#1e293b;border:1px solid #334155;border-radius:8px;padding:20px;margin:20px 0;text-align:center;">
  <div style="text-align:center;margin-bottom:15px;">
    <h4 style="color:#f1f5f9;margin-bottom:5px;">Sui Move Tutorial Video</h4>
    <p style="color:#94a3b8;font-size:14px;">Complete explanation of what you just read</p>
  </div>

  <div style="width:100%;max-width:min(480px, 90vw);margin:0 auto;border-radius:8px;overflow:hidden;">
    <div style="width:100%;height:clamp(200px, 30vh, 270px);background:#1e293b;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#94a3b8;border-radius:8px;text-align:center;padding:15px;">
      <div style="font-size:clamp(36px, 8vw, 48px);margin-bottom:10px;">🎥</div>
      <p style="margin-bottom:15px;font-size:clamp(14px, 4vw, 16px);line-height:1.4;">Watch the Complete Tutorial Video</p>
      <a
        href="https://www.youtube.com/watch?v=uLvWkp6wBkk"
        target="_blank"
        style="background:#3b82f6;color:white;padding:clamp(8px, 2vw, 12px) clamp(16px, 4vw, 24px);border-radius:6px;text-decoration:none;font-weight:500;font-size:clamp(14px, 3.5vw, 16px);display:inline-block;min-width:120px;text-align:center;"
      >
        ▶️ Watch on YouTube
      </a>
    </div>
  </div>

  <p style="color:#64748b;font-size:14px;margin-top:10px;text-align:center;">
    15 minutes • Click play to start watching

</p>`,
          code: `// Ready to build your first Sui smart contract!`
        }
      ]
    },
    {
      title: "Smart Contract Development",
      description: "From hello world to complex dApps on Sui",
      duration: "4 hours",
      level: "Intermediate",
      lessons: 12,
      icon: <FileText className="w-6 h-6" />,
      content: [
        {
          title: "Smart Contract Basics",
          content: `<p>Smart contracts on Sui are written in Move language. Every contract is a module that defines structs, functions, and logic for your dApp.</p>

<p>Key components of a Sui smart contract:</p>
<ul>
<li><strong>Module Declaration</strong>: Defines the contract namespace</li>
<li><strong>Structs</strong>: Data structures that can be stored on-chain</li>
<li><strong>Functions</strong>: Executable logic</li>
<li><strong>Events</strong>: Logging mechanism for off-chain monitoring</li>
</ul>`,
          code: `module my_addr::my_contract {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::TxContext;

    // Struct definition
    public struct MyObject has key {
        id: UID,
        value: u64,
    }

    // Function
    public fun create_object(value: u64, ctx: &mut TxContext) {
        let obj = MyObject {
            id: object::new(ctx),
            value,
        };
        transfer::transfer(obj, tx_context::sender(ctx));
    }
}`
        },
        {
          title: "Structs and Abilities",
          content: `<p>Structs in Move define data structures. Sui objects must have the <code>key</code> ability to be stored on-chain.</p>

<p>Move abilities:</p>
<ul>
<li><code>key</code>: Can be stored as a top-level object</li>
<li><code>store</code>: Can be stored inside other structs</li>
<li><code>copy</code>: Can be copied</li>
<li><code>drop</code>: Can be explicitly destroyed</li>
</ul>`,
          code: `// Owned object (can be transferred)
public struct NFT has key, store {
    id: UID,
    name: String,
    description: String,
}

// Shared data (cannot be transferred)
public struct Config has store {
    admin: address,
    paused: bool,
}`
        },
        {
          title: "Functions and Visibility",
          content: `<p>Functions define the executable logic of your contract. Visibility modifiers control access:</p>

<ul>
<li><code>public</code>: Callable by anyone</li>
<li><code>public(friend)</code>: Callable by friend modules</li>
<li><code>entry</code>: Can be called via CLI/transactions</li>
</ul>`,
          code: `// Public function - anyone can call
public fun update_value(obj: &mut MyObject, new_value: u64) {
    obj.value = new_value;
}

// Entry function - CLI callable
entry fun mint_nft(name: String, ctx: &mut TxContext) {
    let nft = NFT {
        id: object::new(ctx),
        name,
        description: string::utf8(b"NFT Description"),
    };
    transfer::transfer(nft, tx_context::sender(ctx));
}`
        },
        {
          title: "Events and Logging",
          content: `<p>Events allow contracts to communicate with off-chain applications. Use events to log important state changes.</p>`,
          code: `// Event definition
public struct ValueChanged has copy, drop {
    object_id: ID,
    old_value: u64,
    new_value: u64,
}

// Emitting events
public fun update_with_event(obj: &mut MyObject, new_value: u64) {
    let old_value = obj.value;
    obj.value = new_value;

    event::emit(ValueChanged {
        object_id: object::id(obj),
        old_value,
        new_value,
    });
}`
        },
        {
          title: "Error Handling",
          content: `<p>Move uses <code>assert!</code> for error handling. Functions can also return custom error codes.</p>`,
          code: `const E_INVALID_VALUE: u64 = 1;
const E_UNAUTHORIZED: u64 = 2;

public fun set_value(obj: &mut MyObject, value: u64, caller: &TxContext) {
    // Check authorization
    assert!(tx_context::sender(caller) == obj.owner, E_UNAUTHORIZED);

    // Validate input
    assert!(value > 0, E_INVALID_VALUE);

    obj.value = value;
}`
        },
        {
          title: "Testing Contracts",
          content: `<p>Test your contracts using Move's built-in testing framework. Tests ensure your logic works correctly.</p>`,
          code: `#[test]
fun test_create_object() {
    let ctx = tx_context::dummy();
    let obj = create_object(42, &mut ctx);

    assert!(obj.value == 42, 0);
    transfer::public_transfer(obj, @0x0);
}

#[test]
#[expected_failure(abort_code = 1)]
fun test_invalid_value() {
    // This should fail
}`
        },
        {
          title: "Contract Deployment",
          content: `<p>Deploy your contract to Sui network using the CLI. Make sure to test thoroughly before mainnet deployment.</p>`,
          code: `# Build the contract
sui move build

# Test the contract
sui move test

# Deploy to devnet
sui client publish --gas-budget 10000000`
        }
      ]
    },
    {
      title: "Sui SDK Integration",
      description: "Connect your frontend to Sui blockchain",
      duration: "3 hours",
      level: "Intermediate",
      lessons: 10,
      icon: <Code className="w-6 h-6" />,
      content: [
        {
          title: "Introduction to Sui Move",
          content: `<p><em>Comprehensive introduction to Move programming on Sui blockchain</em></p>

<div style="width:100%;max-width:480px;margin:20px auto;border-radius:8px;overflow:hidden;">
  <ReactPlayer
    url="https://www.youtube.com/watch?v=KRbu5GvkTRc"
    width="100%"
    height="270px"
    controls={true}
    playing={false}
    config={{
      youtube: {
        playerVars: {
          modestbranding: 1,
          rel: 0,
          autoplay: 0,
          showinfo: 0,
          iv_load_policy: 3
        }
      }
    }}
  />
</div>

<p>Even as a developer with experience writing smart contracts with Rust and Solidity, I initially experienced some overhead trying to understand and express myself with Move.</p>

<p>This is the first article in my Sui Move series. I promise to set you up for success with everything you need to start building on the Sui blockchain as soon as possible.</p>

<h2>Getting Started With Sui Move</h2>

<p>You don't need development experience to start writing smart contracts. Move is a language with its primitives, so you'll need some expertise here. Sui Move is the JavaScript of Web3.</p>

<p>To remain language-agnostic, we'll use the Sui-CLI tool to interact with the smart contracts we build in this series.</p>

<p>Depending on the operating system and package manager you’re using, here's how you can install Sui CLI on your computer:</p>`,
          code: `brew install sui`
        },
        {
          title: "Installing Sui CLI",
          content: `<p>Execute this command to install Sui CLI on your terminal if you're running a Unix-based operating system (macOS or Linux) via Homebrew.</p>`,
          code: `brew install sui`
        },
        {
          title: "Windows Installation",
          content: `<p>Execute this command to install Sui CLI on your terminal if you're running Windows via Chocolatey.</p>`,
          code: `choco install sui`
        },
        {
          title: "Verifying Installation",
          content: `<p>After installing the Sui CLI client, execute this command to verify your installation.</p>`,
          code: `sui --version

# output: sui 1.40.1-homebrew`
        },
        {
          title: "Development Environment Setup",
          content: `<p>Next, you'll need an IDE to write smart contracts easily and on the fly. Considering it's 2025, I advise downloading Cursor or VSCode and getting an extension with AI capabilities.</p>

<p>Unfortunately, I won't recommend IntelliJ IDEs, although they're my most used; there's hardly comprehensive support for Move as much as you'll get using VSCode, but the option is still open.</p>`,
          code: `# Recommended IDEs:
# - Cursor (cursor.com)
# - VSCode (code.visualstudio.com)
# - With AI extensions for better development`
        },
        {
          title: "Useful Sui Development Resources",
          content: `<p>The most useful resources for reference are the <a href="https://docs.sui.io/concepts/sui-move-concepts" target="_blank">Sui Move documentation</a> and the <a href="https://move-book.com/" target="_blank">Move Book</a>. Both are from Mysten Labs, and they were very useful in my journey.</p>

<p>It's the age of AI, you'll probably be using it to make your work faster. I found the AI integration in the official Sui documentation helpful, followed by DeepSeek, Claude, and OpenAI's models in that order.</p>

<h3>Sui Tears</h3>
<p><a href="https://docs.interestprotocol.com/overview/deprecated/sui-tears" target="_blank">Sui Tears by Interest Protocol</a> is a collection of open-source, ready-to-use smart contracts for multiple real-world use cases, including airdrops, DeFi, Governance, etc.</p>

<h3>Mysten Labs' Sui Examples</h3>
<p><a href="https://github.com/MystenLabs/sui/tree/main/examples" target="_blank">Mysten Labs</a> also has an examples/ directory stacked with practical applications for Sui that you should check out.</p>`,
          code: `# Check out these resources:
# - Sui Documentation: https://docs.sui.io
# - Move Book: https://move-book.com
# - Sui Examples: https://github.com/MystenLabs/sui/tree/main/examples`
        },
        {
          title: "Awesome Move & Community Resources",
          content: `<p><a href="https://github.com/MystenLabs/awesome-move" target="_blank">Awesome Move</a> is a collection of code and content from the Move community. Regardless of your learning style, you'll find everything necessary to succeed as a Move developer here.</p>

<h3>Everybody's Codebase</h3>
<p>You can <a href="https://docs.github.com/en/search-github/github-code-search/understanding-github-code-search-syntax" target="_blank">search GitHub</a> for Move codebases and check out what Move devs are cooking. On the Github Search bar, use <code>language:Move</code> and further filter to narrow results based on what you're searching for.</p>

<h3>The Move Package Registry</h3>
<p>The <a href="https://www.moveregistry.com/" target="_blank">Move Package Registry</a> is the npmjs.com alternative for Sui Move projects. It is a place to share and discover Move packages.</p>`,
          code: `# GitHub search for Move projects:
# language:Move

# Move Package Registry:
# https://www.moveregistry.com/`
        },
        {
          title: "Sui CLI Cheat Sheet - Getting Started",
          content: `<p>When building smart contracts, you'll also need to build a client that interacts with the smart contract. Aside from querying on-chain data, Clients can read and execute smart contracts depending on the primitives defined in the contract.</p>

<p>Sui CLI is your best bet for a client since you can easily make CLI calls from any language you eventually decide to build clients with.</p>

<h3>Installing Sui CLI</h3>
<p>Execute this command on your terminal to install Sui CLI if you're running a Unix-based operating system (macOS or Linux) via Homebrew.</p>`,
          code: `brew install sui`
        },
        {
          title: "Environment Management",
          content: `<p>Every chain provides you with three fundamental networks: Mainnet, Testnet, and Devnet. You can also spawn a test chain locally to keep development in stealth mode.</p>

<p>Here's the command you'll execute to spawn a local network.</p>`,
          code: `RUST_LOG="off,sui_node=info" sui start --with-faucet --force-regenesis`
        },
        {
          title: "Connecting to Local Network",
          content: `<p>Now, you can connect to the local network with the <code>new-env</code> command like this:</p>`,
          code: `sui client new-env --alias local --rpc http://127.0.0.1:9000`
        },
        {
          title: "Switching Environments",
          content: `<p>You can switch and activate any environment with this general command.</p>`,
          code: `sui client switch --env <ENV_NAME>`
        },
        {
          title: "Address and Key Management",
          content: `<p>You can view the currently active address with the <code>active-address</code> command.</p>`,
          code: `sui client active-address`
        },
        {
          title: "Listing Addresses",
          content: `<p>You can list all the addresses in your client with the <code>addresses</code> command.</p>`,
          code: `sui client addresses`
        },
        {
          title: "Key Management",
          content: `<p>When building your apps, for security or other reasons, you might want to run CLI commands to work with keys. The <code>keytool</code> command is your friend here.</p>

<p>You can list all the keys in a keystore with the <code>list</code> command like this:</p>`,
          code: `sui keytool list`
        },
        {
          title: "Generating Keys",
          content: `<p>You can generate keys with the <code>generate</code> command followed with a specification of the scheme.</p>`,
          code: `sui keytool generate ed25519`
        },
        {
          title: "Gas and Faucet Management",
          content: `<p>When you're developing your apps, ideally, you'll start out on devnet, then testnet before deploying to mainnet.</p>

<p>Devnet and Testnet gas are free to acquire. But mainnet? nah.</p>

<p>You can easily request gas on devnet with the <code>client faucet</code> command:</p>`,
          code: `sui client faucet`
        },
        {
          title: "Checking Gas Balance",
          content: `<p>Use the <code>client gas</code> command to check the client's available gas tokens on the current environment.</p>`,
          code: `sui client gas`
        },
        {
          title: "Publishing Packages",
          content: `<p>You can publish packages on to the Sui network with the <code>client publish</code> command.</p>`,
          code: `sui client publish --gas-budget 5000000`
        },
        {
          title: "Coin Management",
          content: `<p>When you're working with SUI coins, you'll probably need to merge and split them often—especially when juggling gas or sending different amounts to various contracts or users.</p>

<p>If you've have two coins lying around, and you want to consolidate them, use the <code>merge-coin</code> command like this:</p>`,
          code: `sui client merge-coin --primary-coin <COIN_ID> --coin-to-merge <COIN_ID>`
        },
        {
          title: "Splitting Coins",
          content: `<p>Need to split a coin instead? Maybe you want to pay out to multiple recipients or just need different denominations. You can slice a coin up using <code>split-coin</code> like this:</p>`,
          code: `sui client split-coin --coin-id <COIN_ID> --amounts <AMOUNTS>`
        },
        {
          title: "Transferring SUI",
          content: `<p>If you need to send out coins, you'll use the <code>client transfer-sui</code> command like this:</p>`,
          code: `sui client transfer-sui --sui-coin-object-id <COIN_ID> --to <ADDRESS>`
        },
        {
          title: "Programmable Transaction Blocks",
          content: `<p>Sui is one of the few chains with native PTBs. Programmable Transaction Blocks let you bundle multiple operations into a single transaction—kinda like a mini-script that executes on-chain.</p>

<p>Say you need to call a Move function directly from your CLI. You'll do that like this:</p>`,
          code: `sui client ptb --move-call <PACKAGE>::<MODULE>::<FUNCTION> "<TYPE>" <ARGS>`
        },
        {
          title: "Conclusion",
          content: `<p>Hopefully, this article suffices for introducing you to the Sui CLI tool. It's more than a client, there's a lot you can do with this tool.</p>

<p>If you ever need a quick refresher or you're trying out a new command, make the <a href="https://docs.sui.io/references/cli/cheatsheet" target="_blank">Sui CLI Cheat Sheet</a> your best friend. And when in doubt, the <a href="https://docs.sui.io/references/cli/client" target="_blank">Sui Client CLI Docs</a> have the full breakdown.</p>

<h3>🎥 Watch the Complete Tutorial Video</h3>
<p>Now that you've read through all the concepts, watch this comprehensive video that explains everything you just learned:</p>

<div style="background:#1e293b;border:1px solid #334155;border-radius:8px;padding:20px;margin:20px 0;">
  <div style="text-align:center;margin-bottom:15px;">
    <h4 style="color:#f1f5f9;margin-bottom:5px;">Sui SDK Integration Video</h4>
    <p style="color:#94a3b8;font-size:14px;">Complete explanation of CLI and SDK integration</p>
  </div>

  <div style="width:100%;max-width:480px;margin:0 auto;border-radius:8px;overflow:hidden;">
    <div style="width:100%;height:clamp(200px, 30vh, 270px);background:#1e293b;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#94a3b8;border-radius:8px;text-align:center;padding:15px;">
      <div style="font-size:clamp(36px, 8vw, 48px);margin-bottom:10px;">🎥</div>
      <p style="margin-bottom:15px;font-size:clamp(14px, 4vw, 16px);line-height:1.4;">Watch the Complete Tutorial Video</p>
      <a
        href="https://www.youtube.com/watch?v=KRbu5GvkTRc"
        target="_blank"
        style="background:#3b82f6;color:white;padding:clamp(8px, 2vw, 12px) clamp(16px, 4vw, 24px);border-radius:6px;text-decoration:none;font-weight:500;font-size:clamp(14px, 3.5vw, 16px);display:inline-block;min-width:120px;text-align:center;"
      >
        ▶️ Watch on YouTube
      </a>
    </div>
  </div>

  <p style="color:#64748b;font-size:14px;margin-top:10px;text-align:center;">
    15 minutes • Click play to start watching
  </p>
</div>`,
          code: `// Ready to integrate Sui SDK!
// Check out: https://docs.sui.io/
// CLI Reference: https://docs.sui.io/references/cli/client`
        }
      ]
    },
    {
      title: "DeFi Protocol Building",
      description: "Build yield farming and staking contracts",
      duration: "6 hours",
      level: "Advanced",
      lessons: 15,
      icon: <Award className="w-6 h-6" />,
      content: [
        {
          title: "DeFi Fundamentals on Sui",
          content: `<p>DeFi (Decentralized Finance) protocols on Sui leverage the high throughput and low fees of the network. Key DeFi primitives include:</p>

<ul>
<li><strong>Token Creation</strong>: Custom fungible tokens</li>
<li><strong>Liquidity Pools</strong>: Automated market making</li>
<li><strong>Staking & Yield Farming</strong>: Reward mechanisms</li>
<li><strong>Lending Protocols</strong>: Collateralized borrowing</li>
</ul>

<p>Sui's object-centric model makes DeFi development unique compared to other blockchains.</p>`,
          code: `// Basic token structure
public struct MyToken has drop {
    amount: u64,
}

public struct Treasury has key {
    id: UID,
    total_supply: u64,
}`
        },
        {
          title: "Creating Fungible Tokens",
          content: `<p>Sui uses a regulated coin system for fungible tokens. Create your own token with custom supply mechanics.</p>`,
          code: `module my_token_addr::my_token {
    use sui::coin::{Self, TreasuryCap};
    use sui::transfer;

    public struct MY_TOKEN has drop {}

    fun init(witness: MY_TOKEN, ctx: &mut TxContext) {
        let (treasury_cap, metadata) = coin::create_currency(
            witness,
            9, // decimals
            b"MYT", // symbol
            b"My Token", // name
            b"Custom token for DeFi", // description
            option::none(), // icon url
            ctx
        );

        transfer::public_freeze_object(metadata);
        transfer::public_transfer(treasury_cap, tx_context::sender(ctx));
    }
}`
        },
        {
          title: "Staking Mechanisms",
          content: `<p>Staking allows users to lock tokens for rewards. Implement time-based or amount-based staking logic.</p>`,
          code: `public struct Stake has key, store {
    id: UID,
    amount: u64,
    owner: address,
    start_time: u64,
    lock_period: u64, // in seconds
}

public struct StakePool has key {
    id: UID,
    total_staked: u64,
    reward_rate: u64, // rewards per second
}

public fun stake_tokens(
    pool: &mut StakePool,
    amount: u64,
    lock_period: u64,
    ctx: &mut TxContext
) {
    let stake = Stake {
        id: object::new(ctx),
        amount,
        owner: tx_context::sender(ctx),
        start_time: tx_context::epoch(ctx),
        lock_period,
    };

    pool.total_staked = pool.total_staked + amount;
    transfer::transfer(stake, tx_context::sender(ctx));
}`
        },
        {
          title: "Reward Distribution",
          content: `<p>Calculate and distribute staking rewards based on time and amount staked.</p>`,
          code: `public fun calculate_rewards(stake: &Stake, pool: &StakePool, current_time: u64): u64 {
    let staking_duration = current_time - stake.start_time;
    let reward_amount = (stake.amount * pool.reward_rate * staking_duration) / 1000000;
    reward_amount
}

public fun claim_rewards(
    stake: &mut Stake,
    pool: &mut StakePool,
    reward_coin: &mut TreasuryCap<RewardToken>,
    ctx: &mut TxContext
) {
    let current_time = tx_context::epoch(ctx);
    let rewards = calculate_rewards(stake, pool, current_time);

    // Mint reward tokens
    let reward_tokens = coin::mint(reward_coin, rewards, ctx);
    transfer::public_transfer(reward_tokens, stake.owner);

    // Reset staking period
    stake.start_time = current_time;
}`
        },
        {
          title: "Liquidity Pools",
          content: `<p>Create automated market maker (AMM) pools for token swapping.</p>`,
          code: `public struct LiquidityPool has key {
    id: UID,
    token_a: Balance<TokenA>,
    token_b: Balance<TokenB>,
    lp_supply: u64,
    fee_percentage: u64, // e.g., 30 = 0.3%
}

public fun add_liquidity(
    pool: &mut LiquidityPool,
    token_a: Balance<TokenA>,
    token_b: Balance<TokenB>,
    ctx: &mut TxContext
) {
    let amount_a = balance::value(&token_a);
    let amount_b = balance::value(&token_b);

    // Add to pool
    balance::join(&mut pool.token_a, token_a);
    balance::join(&mut pool.token_b, token_b);

    // Mint LP tokens
    let lp_tokens = (amount_a + amount_b) / 2; // Simplified
    pool.lp_supply = pool.lp_supply + lp_tokens;
}`
        },
        {
          title: "Token Swapping",
          content: `<p>Implement constant product formula for token exchanges.</p>`,
          code: `public fun swap_tokens(
    pool: &mut LiquidityPool,
    token_in: Balance<TokenA>,
    min_out: u64,
    ctx: &mut TxContext
): Balance<TokenB> {
    let amount_in = balance::value(&token_in);
    let reserve_a = balance::value(&pool.token_a);
    let reserve_b = balance::value(&pool.token_b);

    // Calculate output using constant product formula
    let amount_out = (amount_in * reserve_b) / (reserve_a + amount_in);
    let fee = (amount_out * pool.fee_percentage) / 10000;

    assert!(amount_out >= min_out + fee, E_SLIPPAGE_TOO_HIGH);

    // Execute swap
    balance::join(&mut pool.token_a, token_in);
    balance::split(&mut pool.token_b, amount_out)
}`
        },
        {
          title: "Yield Farming",
          content: `<p>Create incentive mechanisms for liquidity providers and stakers.</p>`,
          code: `public struct Farm has key {
    id: UID,
    reward_token: TreasuryCap<RewardToken>,
    total_staked: u64,
    reward_per_second: u64,
    last_reward_time: u64,
}

public fun harvest_rewards(
    farm: &mut Farm,
    user_stake: u64,
    user_last_harvest: u64,
    ctx: &mut TxContext
): Balance<RewardToken> {
    let current_time = tx_context::epoch(ctx);
    let time_elapsed = current_time - user_last_harvest;

    let total_rewards = farm.reward_per_second * time_elapsed;
    let user_rewards = (total_rewards * user_stake) / farm.total_staked;

    coin::mint(&mut farm.reward_token, user_rewards, ctx)
}`
        },
        {
          title: "Security Considerations",
          content: `<p>Critical security practices for DeFi protocols:</p>

<ul>
<li><strong>Access Control</strong>: Proper authorization checks</li>
<li><strong>Overflow Protection</strong>: Safe math operations</li>
<li><strong>Reentrancy Guards</strong>: Prevent reentrancy attacks</li>
<li><strong>Input Validation</strong>: Validate all user inputs</li>
</ul>`,
          code: `// Safe math with overflow checks
public fun safe_add(a: u64, b: u64): u64 {
    let sum = a + b;
    assert!(sum >= a, E_OVERFLOW);
    sum
}

// Access control
public struct AdminCap has key, store { id: UID }

public fun emergency_pause(
    _: &AdminCap,
    config: &mut Config
) {
    config.paused = true;
}`
        }
      ]
    }
  ];

  const learningPaths = [
    {
      id: "beginner",
      title: "Beginner Track",
      description: "Sui fundamentals, wallet setup, first transaction",
      duration: "8 hours",
      modules: 6,
      level: "Beginner",
      progress: learningProgress.beginner,
      color: "from-green-500 to-emerald-600",
      prerequisites: [],
      curriculum: [
        {
          id: "sui-basics",
          title: "Sui Blockchain Basics",
          description: "Understanding Sui's unique architecture and object model",
          duration: "1.5 hours",
          completed: false,
          unlocked: true,
          content: "Learn about Sui's object-centric model, validators, and consensus mechanism."
        },
        {
          id: "wallet-setup",
          title: "Wallet Setup & Management",
          description: "Install Sui wallet, manage addresses, and secure your assets",
          duration: "1 hour",
          completed: false,
          unlocked: false,
          content: "Set up Sui Wallet, create addresses, and understand key management."
        },
        {
          id: "first-transaction",
          title: "Your First Transaction",
          description: "Send your first SUI tokens and understand transaction flow",
          duration: "1 hour",
          completed: false,
          unlocked: false,
          content: "Execute your first blockchain transaction and monitor its progress."
        },
        {
          id: "move-intro",
          title: "Introduction to Move",
          description: "Basic concepts of Move programming language",
          duration: "2 hours",
          completed: false,
          unlocked: false,
          content: "Learn Move syntax, variables, and basic programming concepts."
        },
        {
          id: "simple-contract",
          title: "Deploy Your First Contract",
          description: "Write and deploy a simple Move contract",
          duration: "1.5 hours",
          completed: false,
          unlocked: false,
          content: "Create, test, and deploy your first smart contract on Sui."
        },
        {
          id: "beginner-certificate",
          title: "Beginner Certification",
          description: "Complete assessment and earn your certificate",
          duration: "30 min",
          completed: false,
          unlocked: false,
          content: "Take the final assessment and receive your beginner certification."
        }
      ]
    },
    {
      id: "developer",
      title: "Developer Track",
      description: "Move programming, contract deployment, testing",
      duration: "20 hours",
      modules: 12,
      level: "Intermediate",
      progress: learningProgress.developer,
      color: "from-blue-500 to-cyan-600",
      prerequisites: ["beginner"],
      curriculum: [
        {
          id: "advanced-move",
          title: "Advanced Move Concepts",
          description: "Deep dive into Move structs, generics, and abilities",
          duration: "3 hours",
          completed: false,
          unlocked: false,
          content: "Master Move's type system, generics, and ability system."
        },
        {
          id: "contract-architecture",
          title: "Smart Contract Architecture",
          description: "Design patterns and best practices for Sui contracts",
          duration: "2.5 hours",
          completed: false,
          unlocked: false,
          content: "Learn to structure complex smart contracts with proper separation of concerns."
        },
        {
          id: "token-standards",
          title: "Token Standards & Fungible Assets",
          description: "Implement ERC-20 equivalent tokens on Sui",
          duration: "2 hours",
          completed: false,
          unlocked: false,
          content: "Create custom tokens with regulated supply mechanisms."
        },
        {
          id: "nft-development",
          title: "NFT Development",
          description: "Build NFT contracts with metadata and royalties",
          duration: "2.5 hours",
          completed: false,
          unlocked: false,
          content: "Develop NFT contracts with advanced features like royalties and metadata."
        },
        {
          id: "testing-debugging",
          title: "Testing & Debugging",
          description: "Unit tests, integration tests, and debugging techniques",
          duration: "2 hours",
          completed: false,
          unlocked: false,
          content: "Master testing frameworks and debugging tools for Move contracts."
        },
        {
          id: "frontend-integration",
          title: "Frontend Integration",
          description: "Connect your contracts to React/TypeScript frontends",
          duration: "2.5 hours",
          completed: false,
          unlocked: false,
          content: "Build full-stack dApps with Sui SDK integration."
        },
        {
          id: "security-audit",
          title: "Security & Auditing",
          description: "Common vulnerabilities and security best practices",
          duration: "2 hours",
          completed: false,
          unlocked: false,
          content: "Learn to write secure contracts and perform security audits."
        },
        {
          id: "deployment-production",
          title: "Deployment & Production",
          description: "Deploy to mainnet and manage production contracts",
          duration: "1.5 hours",
          completed: false,
          unlocked: false,
          content: "Production deployment strategies and contract management."
        },
        {
          id: "developer-certificate",
          title: "Developer Certification",
          description: "Advanced assessment and professional certification",
          duration: "45 min",
          completed: false,
          unlocked: false,
          content: "Comprehensive assessment covering all developer track topics."
        }
      ]
    },
    {
      id: "advanced",
      title: "Advanced Track",
      description: "Cross-chain bridges, complex DeFi protocols",
      duration: "30 hours",
      modules: 18,
      level: "Advanced",
      progress: learningProgress.advanced,
      color: "from-purple-500 to-pink-600",
      prerequisites: ["developer"],
      curriculum: [
        {
          id: "defi-primitives",
          title: "DeFi Primitives",
          description: "Core DeFi concepts: AMMs, lending, staking",
          duration: "3 hours",
          completed: false,
          unlocked: false,
          content: "Master fundamental DeFi mechanisms and mathematical models."
        },
        {
          id: "amm-implementation",
          title: "Automated Market Makers",
          description: "Build Uniswap V2 equivalent on Sui",
          duration: "4 hours",
          completed: false,
          unlocked: false,
          content: "Implement constant product formula and liquidity provision."
        },
        {
          id: "lending-protocol",
          title: "Lending Protocol",
          description: "Create Aave-style lending with collateralization",
          duration: "4 hours",
          completed: false,
          unlocked: false,
          content: "Build over-collateralized lending with liquidation mechanisms."
        },
        {
          id: "yield-farming",
          title: "Yield Farming & Incentives",
          description: "Design reward distribution and farming mechanisms",
          duration: "3 hours",
          completed: false,
          unlocked: false,
          content: "Implement staking rewards and incentive structures."
        },
        {
          id: "cross-chain-basics",
          title: "Cross-Chain Fundamentals",
          description: "Understanding bridge protocols and interoperability",
          duration: "2.5 hours",
          completed: false,
          unlocked: false,
          content: "Learn cross-chain communication patterns and security."
        },
        {
          id: "bridge-implementation",
          title: "Bridge Implementation",
          description: "Build a cross-chain bridge for asset transfers",
          duration: "4 hours",
          completed: false,
          unlocked: false,
          content: "Implement secure cross-chain asset transfers with validation."
        },
        {
          id: "dao-governance",
          title: "DAO & Governance",
          description: "Decentralized governance and proposal systems",
          duration: "3 hours",
          completed: false,
          unlocked: false,
          content: "Build voting mechanisms and governance contracts."
        },
        {
          id: "advanced-security",
          title: "Advanced Security",
          description: "Formal verification and advanced audit techniques",
          duration: "3 hours",
          completed: false,
          unlocked: false,
          content: "Use formal methods and advanced security tools."
        },
        {
          id: "scaling-optimization",
          title: "Scaling & Optimization",
          description: "Gas optimization and parallel execution patterns",
          duration: "2.5 hours",
          completed: false,
          unlocked: false,
          content: "Optimize contracts for Sui's parallel execution model."
        },
        {
          id: "advanced-certificate",
          title: "Advanced Certification",
          description: "Expert-level assessment and certification",
          duration: "1 hour",
          completed: false,
          unlocked: false,
          content: "Rigorous assessment covering advanced blockchain development."
        }
      ]
    }
  ];

  const documentation = [
    {
      title: "Official Sui Documentation",
      description: "Complete guide to Sui blockchain",
      type: "Official",
      link: "https://docs.sui.io/"
    },
    {
      title: "Move Language Reference",
      description: "Comprehensive Move programming guide",
      type: "Reference",
      link: "https://docs.sui.io/concepts/sui-move-concepts"
    },
    {
      title: "Sui RPC API",
      description: "Blockchain interaction endpoints",
      type: "API",
      link: "https://docs.sui.io/sui-api-ref"
    },
    {
      title: "Best Practices",
      description: "Security, optimization, testing guides",
      type: "Guide",
      link: "https://suibyexamples.mintlify.app/"
    }
  ];

  const codeExamples = [
    {
      title: "Basic Token Contract",
      description: "Create and manage custom tokens on Sui",
      language: "Move",
      difficulty: "Beginner",
      downloads: 1250,
      videoUrl: "https://www.youtube.com/watch?v=uLvWkp6wBkk&list=PLwSqiyXKVkfVA5TXrPvnUXM6d07_zw8Ot&index=2",
      fullCode: `module my_token_addr::my_token {
    use sui::coin::{Self, TreasuryCap};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    public struct MY_TOKEN has drop {}

    fun init(witness: MY_TOKEN, ctx: &mut TxContext) {
        let (treasury_cap, metadata) = coin::create_currency(
            witness,
            9, // decimals
            b"MYT", // symbol
            b"My Token", // name
            b"Custom token for learning Sui", // description
            option::none(), // icon url
            ctx
        );

        transfer::public_freeze_object(metadata);
        transfer::public_transfer(treasury_cap, tx_context::sender(ctx));
    }

    public entry fun mint(
        treasury_cap: &mut TreasuryCap<MY_TOKEN>,
        amount: u64,
        recipient: address,
        ctx: &mut TxContext
    ) {
        let coin = coin::mint(treasury_cap, amount, ctx);
        transfer::public_transfer(coin, recipient);
    }
}`
    },
    {
      title: "NFT Marketplace",
      description: "Complete NFT trading platform",
      language: "Move + React",
      difficulty: "Advanced",
      downloads: 890,
      videoUrl: "https://www.youtube.com/watch?v=EJhGT5ZDjyQ&list=PLwSqiyXKVkfVA5TXrPvnUXM6d07_zw8Ot&index=4",
      fullCode: `module nft_marketplace_addr::nft_marketplace {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::event;

    // NFT Structure
    public struct NFT has key, store {
        id: UID,
        name: std::string::String,
        description: std::string::String,
        url: std::string::String,
        creator: address,
    }

    // Marketplace Listing
    public struct Listing has key {
        id: UID,
        nft_id: ID,
        price: u64,
        seller: address,
    }

    // Events
    public struct NFTMinted has copy, drop {
        nft_id: ID,
        creator: address,
        name: std::string::String,
    }

    public struct NFTListed has copy, drop {
        listing_id: ID,
        nft_id: ID,
        price: u64,
        seller: address,
    }

    public struct NFTSold has copy, drop {
        nft_id: ID,
        buyer: address,
        price: u64,
    }

    // Mint NFT
    public entry fun mint_nft(
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        ctx: &mut TxContext
    ) {
        let nft = NFT {
            id: object::new(ctx),
            name: std::string::utf8(name),
            description: std::string::utf8(description),
            url: std::string::utf8(url),
            creator: tx_context::sender(ctx),
        };

        event::emit(NFTMinted {
            nft_id: object::id(&nft),
            creator: tx_context::sender(ctx),
            name: nft.name,
        });

        transfer::transfer(nft, tx_context::sender(ctx));
    }

    // List NFT for sale
    public entry fun list_nft(
        nft: NFT,
        price: u64,
        ctx: &mut TxContext
    ) {
        let listing = Listing {
            id: object::new(ctx),
            nft_id: object::id(&nft),
            price,
            seller: tx_context::sender(ctx),
        };

        event::emit(NFTListed {
            listing_id: object::id(&listing),
            nft_id: object::id(&nft),
            price,
            seller: tx_context::sender(ctx),
        });

        transfer::transfer(listing, tx_context::sender(ctx));
        transfer::transfer(nft, @marketplace_addr);
    }

    // Buy NFT
    public entry fun buy_nft(
        listing: Listing,
        payment: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        // Verify payment amount
        assert!(coin::value(&payment) == listing.price, 0);

        // Transfer payment to seller
        transfer::public_transfer(payment, listing.seller);

        // Transfer NFT to buyer
        let nft = transfer::transfer_from(@marketplace_addr, listing.nft_id);

        event::emit(NFTSold {
            nft_id: listing.nft_id,
            buyer: tx_context::sender(ctx),
            price: listing.price,
        });

        transfer::transfer(nft, tx_context::sender(ctx));
        transfer::transfer(listing, @0x0); // Delete listing
    }
}`
    },
    {
      title: "DeFi Staking Pool",
      description: "Yield farming and staking implementation",
      language: "Move",
      difficulty: "Intermediate",
      downloads: 675,
      videoUrl: "https://www.youtube.com/watch?v=CPyZwr24rnM&list=PLwSqiyXKVkfVA5TXrPvnUXM6d07_zw8Ot&index=12",
      fullCode: `module defi_addr::staking_pool {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::balance::{Self, Balance};
    use sui::table::{Self, Table};
    use sui::event;

    // Staking Pool
    public struct StakingPool has key {
        id: UID,
        total_staked: Balance<SUI>,
        reward_per_second: u64,
        last_reward_time: u64,
        user_stakes: Table<address, UserStake>,
    }

    // User Stake Info
    public struct UserStake has store {
        amount: u64,
        reward_debt: u64,
        last_stake_time: u64,
    }

    // Events
    public struct Staked has copy, drop {
        user: address,
        amount: u64,
        total_staked: u64,
    }

    public struct Unstaked has copy, drop {
        user: address,
        amount: u64,
        total_staked: u64,
    }

    public struct RewardsClaimed has copy, drop {
        user: address,
        amount: u64,
    }

    // Initialize pool
    fun init(ctx: &mut TxContext) {
        let pool = StakingPool {
            id: object::new(ctx),
            total_staked: balance::zero(),
            reward_per_second: 1000000, // 1 SUI per second for rewards
            last_reward_time: tx_context::epoch(ctx),
            user_stakes: table::new(ctx),
        };
        transfer::share_object(pool);
    }

    // Stake SUI tokens
    public entry fun stake(
        pool: &mut StakingPool,
        stake_coin: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        let stake_amount = coin::value(&stake_coin);
        let user_addr = tx_context::sender(ctx);

        // Update pool rewards
        update_pool(pool, ctx);

        // Add stake to pool
        balance::join(&mut pool.total_staked, coin::into_balance(stake_coin));

        // Update or create user stake
        if (table::contains(&pool.user_stakes, user_addr)) {
            let user_stake = table::borrow_mut(&mut pool.user_stakes, user_addr);
            user_stake.amount = user_stake.amount + stake_amount;
            user_stake.last_stake_time = tx_context::epoch(ctx);
        } else {
            let user_stake = UserStake {
                amount: stake_amount,
                reward_debt: 0,
                last_stake_time: tx_context::epoch(ctx),
            };
            table::add(&mut pool.user_stakes, user_addr, user_stake);
        };

        event::emit(Staked {
            user: user_addr,
            amount: stake_amount,
            total_staked: balance::value(&pool.total_staked),
        });
    }

    // Unstake tokens
    public entry fun unstake(
        pool: &mut StakingPool,
        amount: u64,
        ctx: &mut TxContext
    ) {
        let user_addr = tx_context::sender(ctx);

        // Update pool rewards
        update_pool(pool, ctx);

        // Get user stake
        assert!(table::contains(&pool.user_stakes, user_addr), 0);
        let user_stake = table::borrow_mut(&mut pool.user_stakes, user_addr);

        // Check sufficient balance
        assert!(user_stake.amount >= amount, 1);

        // Update user stake
        user_stake.amount = user_stake.amount - amount;

        // Return staked tokens
        let unstake_balance = balance::split(&mut pool.total_staked, amount);
        let unstake_coin = coin::from_balance(unstake_balance, ctx);
        transfer::public_transfer(unstake_coin, user_addr);

        event::emit(Unstaked {
            user: user_addr,
            amount,
            total_staked: balance::value(&pool.total_staked),
        });
    }

    // Claim rewards
    public entry fun claim_rewards(
        pool: &mut StakingPool,
        ctx: &mut TxContext
    ) {
        let user_addr = tx_context::sender(ctx);

        // Update pool rewards
        update_pool(pool, ctx);

        // Calculate pending rewards
        let user_stake = table::borrow(&pool.user_stakes, user_addr);
        let pending_rewards = calculate_pending_rewards(pool, user_addr);

        if (pending_rewards > 0) {
            // Mint reward tokens (simplified - in real implementation you'd have a reward token)
            let reward_coin = coin::mint(&mut pool.reward_treasury, pending_rewards, ctx);
            transfer::public_transfer(reward_coin, user_addr);

            // Update reward debt
            let user_stake_mut = table::borrow_mut(&mut pool.user_stakes, user_addr);
            user_stake_mut.reward_debt = user_stake_mut.reward_debt + pending_rewards;

            event::emit(RewardsClaimed {
                user: user_addr,
                amount: pending_rewards,
            });
        }
    }

    // Update pool rewards
    fun update_pool(pool: &mut StakingPool, ctx: &mut TxContext) {
        let current_time = tx_context::epoch(ctx);
        if (current_time > pool.last_reward_time) {
            let time_elapsed = current_time - pool.last_reward_time;
            let total_staked = balance::value(&pool.total_staked);

            if (total_staked > 0) {
                let rewards = time_elapsed * pool.reward_per_second;
                // In real implementation, you'd mint rewards here
            }

            pool.last_reward_time = current_time;
        }
    }

    // Calculate pending rewards for user
    fun calculate_pending_rewards(pool: &StakingPool, user: address): u64 {
        if (!table::contains(&pool.user_stakes, user)) {
            return 0
        };

        let user_stake = table::borrow(&pool.user_stakes, user);
        let current_time = tx_context::epoch(ctx);
        let time_elapsed = current_time - user_stake.last_stake_time;

        (user_stake.amount * pool.reward_per_second * time_elapsed) / 1000000 - user_stake.reward_debt
    }
}`
    },
    {
      title: "Cross-chain Bridge",
      description: "Connect Sui with other blockchains",
      language: "Move + TypeScript",
      difficulty: "Advanced",
      downloads: 432,
      videoUrl: "https://www.youtube.com/watch?v=ca_1HmzNrKg&list=PLwSqiyXKVkfVA5TXrPvnUXM6d07_zw8Ot",
      fullCode: `module bridge_addr::bridge {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::event;
    use sui::table::{Self, Table};

    // Bridge Configuration
    public struct BridgeConfig has key {
        id: UID,
        admin: address,
        min_bridge_amount: u64,
        max_bridge_amount: u64,
        bridge_fee: u64, // in basis points
        paused: bool,
    }

    // Bridge Request
    public struct BridgeRequest has key, store {
        id: UID,
        user: address,
        amount: u64,
        target_chain: u64, // chain ID
        target_address: vector<u8>, // address on target chain
        request_time: u64,
        status: u8, // 0: pending, 1: completed, 2: failed
    }

    // Events
    public struct BridgeInitiated has copy, drop {
        request_id: ID,
        user: address,
        amount: u64,
        target_chain: u64,
    }

    public struct BridgeCompleted has copy, drop {
        request_id: ID,
        user: address,
        amount: u64,
        target_chain: u64,
    }

    // Initialize bridge
    fun init(ctx: &mut TxContext) {
        let config = BridgeConfig {
            id: object::new(ctx),
            admin: tx_context::sender(ctx),
            min_bridge_amount: 1000000, // 0.001 SUI
            max_bridge_amount: 1000000000000, // 1000 SUI
            bridge_fee: 30, // 0.3%
            paused: false,
        };
        transfer::share_object(config);
    }

    // Initiate bridge transfer
    public entry fun initiate_bridge(
        config: &BridgeConfig,
        amount: Coin<SUI>,
        target_chain: u64,
        target_address: vector<u8>,
        ctx: &mut TxContext
    ) {
        // Check if bridge is not paused
        assert!(!config.paused, 0);

        let bridge_amount = coin::value(&amount);

        // Validate amount
        assert!(bridge_amount >= config.min_bridge_amount, 1);
        assert!(bridge_amount <= config.max_bridge_amount, 2);

        // Calculate fee
        let fee = (bridge_amount * config.bridge_fee) / 10000;
        let bridge_amount_after_fee = bridge_amount - fee;

        // Create bridge request
        let request = BridgeRequest {
            id: object::new(ctx),
            user: tx_context::sender(ctx),
            amount: bridge_amount_after_fee,
            target_chain,
            target_address,
            request_time: tx_context::epoch(ctx),
            status: 0, // pending
        };

        // Emit event for off-chain processing
        event::emit(BridgeInitiated {
            request_id: object::id(&request),
            user: tx_context::sender(ctx),
            amount: bridge_amount_after_fee,
            target_chain,
        });

        // Lock tokens (in real implementation, this would be handled by bridge validators)
        transfer::public_transfer(amount, @bridge_treasury);

        // Store request
        transfer::transfer(request, tx_context::sender(ctx));
    }

    // Complete bridge (called by bridge validators/oracle)
    public entry fun complete_bridge(
        request: &mut BridgeRequest,
        ctx: &mut TxContext
    ) {
        // Only bridge admin/validator can complete
        assert!(tx_context::sender(ctx) == @bridge_admin, 3);

        // Check if request is pending
        assert!(request.status == 0, 4);

        // Mark as completed
        request.status = 1;

        event::emit(BridgeCompleted {
            request_id: object::id(request),
            user: request.user,
            amount: request.amount,
            target_chain: request.target_chain,
        });
    }

    // Admin functions
    public entry fun update_config(
        config: &mut BridgeConfig,
        min_amount: u64,
        max_amount: u64,
        fee: u64,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == config.admin, 5);

        config.min_bridge_amount = min_amount;
        config.max_bridge_amount = max_amount;
        config.bridge_fee = fee;
    }

    public entry fun pause_bridge(
        config: &mut BridgeConfig,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == config.admin, 6);
        config.paused = true;
    }

    public entry fun unpause_bridge(
        config: &mut BridgeConfig,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == config.admin, 6);
        config.paused = false;
    }
}

// TypeScript client code for interacting with the bridge
export class SuiBridgeClient {
    private provider: JsonRpcProvider;

    constructor(rpcUrl: string) {
        this.provider = new JsonRpcProvider(rpcUrl);
    }

    async initiateBridge(
        signer: Signer,
        amount: number,
        targetChain: number,
        targetAddress: string
    ) {
        const tx = new TransactionBlock();

        // Convert amount to smallest unit
        const amountInMist = amount * 1000000000;

        // Add bridge initiation
        tx.moveCall({
            target: \`\${BRIDGE_PACKAGE_ID}::bridge::initiate_bridge\`,
            arguments: [
                tx.pure(targetChain),
                tx.pure(Array.from(Buffer.from(targetAddress.slice(2), 'hex'))),
                tx.splitCoins(tx.gas, [tx.pure(amountInMist)])
            ],
        });

        const result = await signer.signAndExecuteTransactionBlock({
            transactionBlock: tx,
        });

        return result;
    }

    async getBridgeStatus(requestId: string) {
        const object = await this.provider.getObject({
            id: requestId,
            options: { showContent: true }
        });

        return object.data?.content;
    }
}`
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Learn Sui</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Star className="w-4 h-4 mr-2" />
            My Progress
          </Button>
        </div>
      </div>

      {/* Learning Progress Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg p-4 lg:p-6">
          <div className="flex items-center gap-2 lg:gap-3 mb-3 lg:mb-4">
            <BookOpen className="w-6 h-6 lg:w-8 lg:h-8 text-blue-400" />
            <div>
              <h3 className="text-base lg:text-lg font-bold text-white">Courses Completed</h3>
              <p className="text-slate-400 text-sm">Track your learning journey</p>
            </div>
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-white">2</div>
          <div className="text-sm text-slate-400 mt-2">of 15 available</div>
        </div>

        <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg p-4 lg:p-6">
          <div className="flex items-center gap-2 lg:gap-3 mb-3 lg:mb-4">
            <Award className="w-6 h-6 lg:w-8 lg:h-8 text-green-400" />
            <div>
              <h3 className="text-base lg:text-lg font-bold text-white">Certificates Earned</h3>
              <p className="text-slate-400 text-sm">Showcase your skills</p>
            </div>
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-white">1</div>
          <div className="text-sm text-slate-400 mt-2">Move Basics Certified</div>
        </div>

        <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg p-4 lg:p-6 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 lg:gap-3 mb-3 lg:mb-4">
            <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400" />
            <div>
              <h3 className="text-base lg:text-lg font-bold text-white">Study Time</h3>
              <p className="text-slate-400 text-sm">Hours invested in learning</p>
            </div>
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-white">24h</div>
          <div className="text-sm text-slate-400 mt-2">This month</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-slate-700">
        <nav className="flex overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 lg:space-x-8 min-w-max">
            {[
              { id: 'tutorials', label: 'Tutorials', icon: BookOpen },
              { id: 'paths', label: 'Learning Paths', icon: Play },
              { id: 'docs', label: 'Documentation', icon: FileText },
              { id: 'examples', label: 'Code Examples', icon: Code }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 lg:gap-2 py-3 lg:py-4 px-1 border-b-2 font-medium text-xs lg:text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                <tab.icon className="w-3 h-3 lg:w-4 lg:h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        {activeTab === 'tutorials' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Interactive Tutorials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutorials.map((tutorial, index) => (
                <div key={index} className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg p-6 hover:border-slate-600/50 transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-blue-600/20 rounded-lg text-blue-400">
                      {tutorial.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">{tutorial.title}</h3>
                      <p className="text-slate-400 text-sm mb-3">{tutorial.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {tutorial.duration}
                        </span>
                        <span className={`px-2 py-1 rounded-full ${
                          tutorial.level === 'Beginner' ? 'bg-green-600/20 text-green-400' :
                          tutorial.level === 'Intermediate' ? 'bg-blue-600/20 text-blue-400' :
                          'bg-purple-600/20 text-purple-400'
                        }`}>
                          {tutorial.level}
                        </span>
                        <span>{tutorial.lessons} lessons</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => startTutorial(index)}>
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Start Tutorial
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'paths' && (
          <div>
            {!activePath ? (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">Learning Paths</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                  {learningPaths.map((path, index) => (
                    <div key={index} className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg p-4 lg:p-6">
                      <div className={`w-full h-2 bg-gradient-to-r ${path.color} rounded-full mb-3 lg:mb-4`}></div>
                      <h3 className="text-lg lg:text-xl font-bold text-white mb-2">{path.title}</h3>
                      <p className="text-slate-400 text-sm mb-3 lg:mb-4">{path.description}</p>
                      <div className="space-y-2 mb-4 lg:mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Duration</span>
                          <span className="text-white">{path.duration}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Modules</span>
                          <span className="text-white">{path.modules}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Level</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            path.level === 'Beginner' ? 'bg-green-600/20 text-green-400' :
                            path.level === 'Intermediate' ? 'bg-blue-600/20 text-blue-400' :
                            'bg-purple-600/20 text-purple-400'
                          }`}>
                            {path.level}
                          </span>
                        </div>
                        {path.prerequisites.length > 0 && (
                          <div className="text-xs text-slate-500">
                            Prerequisites: {path.prerequisites.join(', ')}
                          </div>
                        )}
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-slate-400 mb-1">
                          <span>Progress</span>
                          <span>{path.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className={`h-2 bg-gradient-to-r ${path.color} rounded-full`} style={{ width: `${path.progress}%` }}></div>
                        </div>
                      </div>
                      <Button
                        className={`w-full text-sm lg:text-base ${!checkPrerequisites(path.id) ? 'bg-gray-600 cursor-not-allowed' : `bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700`}`}
                        onClick={() => startLearningPath(path.id)}
                        disabled={!checkPrerequisites(path.id)}
                      >
                        <Play className="w-3 h-3 lg:w-4 lg:h-4 mr-2" />
                        {path.progress > 0 ? 'Continue Path' : 'View Curriculum'}
                      </Button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Button variant="outline" onClick={backToPaths} className="border-slate-600 text-slate-300 hover:bg-slate-700">
                    ← Back to Paths
                  </Button>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {learningPaths.find(p => p.id === activePath)?.title}
                    </h2>
                    <p className="text-slate-400">Structured Learning Curriculum</p>
                  </div>
                </div>

                <div className="space-y-3 lg:space-y-4">
                  {learningPaths.find(p => p.id === activePath)?.curriculum.map((module, index) => {
                    const isCompleted = curriculumProgress[activePath]?.[module.id] || false;
                    const isUnlocked = isModuleUnlocked(activePath, index);

                    return (
                      <div key={module.id} className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg p-4 lg:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-3 mb-2">
                              <div className={`w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                                isCompleted
                                  ? 'bg-green-600 text-white'
                                  : isUnlocked
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-600 text-gray-400'
                              }`}>
                                {isCompleted ? '✓' : index + 1}
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="text-base lg:text-lg font-bold text-white break-words">{module.title}</h3>
                                <p className="text-slate-400 text-sm">{module.description}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-xs text-slate-500 ml-10 lg:ml-11">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {module.duration}
                              </span>
                              <span className={`px-2 py-1 rounded-full ${
                                isCompleted
                                  ? 'bg-green-600/20 text-green-400'
                                  : isUnlocked
                                  ? 'bg-blue-600/20 text-blue-400'
                                  : 'bg-gray-600/20 text-gray-400'
                              }`}>
                                {isCompleted ? 'Completed' : isUnlocked ? 'Available' : 'Locked'}
                              </span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className={`self-start sm:self-auto text-sm ${
                              isCompleted
                                ? 'bg-green-600 hover:bg-green-700'
                                : isUnlocked
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-gray-600 cursor-not-allowed'
                            }`}
                            onClick={() => isUnlocked && !isCompleted && completeCurriculumModule(activePath, module.id)}
                            disabled={!isUnlocked || isCompleted}
                          >
                            {isCompleted ? 'Completed ✓' : 'Mark Complete'}
                          </Button>
                        </div>
                        {isUnlocked && (
                          <div className="mt-4 ml-8 lg:ml-11 p-3 lg:p-4 bg-slate-900/50 rounded-lg">
                            <p className="text-slate-300 text-sm break-words">{module.content}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {learningPaths.find(p => p.id === activePath)?.progress === 100 && (
                  <div className="mt-8 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-600/30 rounded-lg p-6">
                    <div className="flex items-center gap-4">
                      <Award className="w-12 h-12 text-yellow-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">🎉 Path Completed!</h3>
                        <p className="text-slate-300">Congratulations! You've completed the {learningPaths.find(p => p.id === activePath)?.title}.</p>
                        <Button className="mt-4 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                          <Award className="w-4 h-4 mr-2" />
                          Download Certificate
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'docs' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Documentation Hub</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documentation.map((doc, index) => (
                <div key={index} className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg p-6 hover:border-slate-600/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">{doc.title}</h3>
                      <p className="text-slate-400 text-sm mb-3">{doc.description}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        doc.type === 'Official' ? 'bg-blue-600/20 text-blue-400' :
                        doc.type === 'Reference' ? 'bg-green-600/20 text-green-400' :
                        doc.type === 'API' ? 'bg-purple-600/20 text-purple-400' :
                        'bg-orange-600/20 text-orange-400'
                      }`}>
                        {doc.type}
                      </span>
                    </div>
                    <FileText className="w-6 h-6 text-slate-400" />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                      onClick={() => openDocumentation(doc)}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View Documentation
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      onClick={() => window.open(doc.link, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Code Examples & Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {codeExamples.map((example, index) => (
                <div key={index} className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg p-6 hover:border-slate-600/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">{example.title}</h3>
                      <p className="text-slate-400 text-sm mb-3">{example.description}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500">{example.language}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          example.difficulty === 'Beginner' ? 'bg-green-600/20 text-green-400' :
                          example.difficulty === 'Intermediate' ? 'bg-blue-600/20 text-blue-400' :
                          'bg-purple-600/20 text-purple-400'
                        }`}>
                          {example.difficulty}
                        </span>
                      </div>
                    </div>
                    <Code className="w-6 h-6 text-slate-400" />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-slate-400">{example.downloads} downloads</span>
                    <div className="flex flex-col sm:flex-row gap-2">
                      {example.videoUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700"
                          onClick={() => openVideoPreview(example)}
                        >
                          <PlayCircle className="w-3 h-3 mr-1" />
                          Watch Video
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        onClick={() => openCodePreview(example)}
                      >
                        <PlayCircle className="w-3 h-3 mr-1" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => downloadCode(example)}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lesson Viewer */}
      {activeLesson !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-slate-800/95 backdrop-blur-md border border-slate-700/50 rounded-lg max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-2 sm:gap-4">
                  <Button variant="outline" onClick={backToLearn} className="border-slate-600 text-slate-300 hover:bg-slate-700 text-sm">
                    ← Back to Learn
                  </Button>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-white truncate">{tutorials[activeLesson].title}</h2>
                    <p className="text-slate-400 text-sm">Lesson {currentStep + 1} of {tutorials[activeLesson].content.length}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-50"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    onClick={nextStep}
                    disabled={currentStep === tutorials[activeLesson].content.length - 1}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-50"
                  >
                    Next
                  </Button>
                  {currentStep === tutorials[activeLesson].content.length - 1 && (
                    <div className="flex gap-2">
                      <Button onClick={completeTutorial} className="bg-green-600 hover:bg-green-700">
                        Complete Tutorial
                      </Button>
                      <Button
                        onClick={() => startQuiz(tutorials[activeLesson].title.toLowerCase().replace(/\s+/g, '-'), tutorials[activeLesson].title)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Take Quiz
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">{tutorials[activeLesson].content[currentStep].title}</h3>
                  <div className="text-slate-300 text-lg leading-relaxed mb-6 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: tutorials[activeLesson].content[currentStep].content }} />
                </div>

                {tutorials[activeLesson].content[currentStep].code && (
                  <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-slate-400">Code Example</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        onClick={() => copyToClipboard(tutorials[activeLesson].content[currentStep].code, tutorials[activeLesson].title)}
                      >
                        {copySuccess === tutorials[activeLesson].title ? '✅ Copied!' : '📋 Copy'}
                      </Button>
                    </div>
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{tutorials[activeLesson].content[currentStep].code}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Code Preview Modal */}
      {codePreview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-slate-800/95 backdrop-blur-md border border-slate-700/50 rounded-lg max-w-4xl w-full max-h-[95vh] overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCodePreview(null)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    ← Back
                  </Button>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">{codePreview.title}</h2>
                    <p className="text-slate-400 text-sm">{codePreview.language} Code Example</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(codePreview.code, codePreview.title)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    {copySuccess === codePreview.title ? '✅ Copied!' : '📋 Copy'}
                  </Button>
                  <Button
                    onClick={() => downloadCode({ title: codePreview.title, fullCode: codePreview.code })}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50">
                  <span className="text-sm text-slate-400">{codePreview.language} Code</span>
                  <span className="text-xs text-slate-500">{codePreview.code.split('\n').length} lines</span>
                </div>
                <pre className="p-4 text-green-400 text-sm overflow-x-auto max-h-96 overflow-y-auto">
                  <code>{codePreview.code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Documentation Viewer Modal */}
      {docViewer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-slate-800/95 backdrop-blur-md border border-slate-700/50 rounded-lg max-w-5xl w-full max-h-[95vh] overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={closeDocumentation}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    ← Back
                  </Button>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">{docViewer.title}</h2>
                    <p className="text-slate-400 text-sm">Embedded Documentation</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => window.open(docViewer.url, '_blank')}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open External
                </Button>
              </div>

              <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg overflow-hidden">
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-6 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: docViewer.content }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      {videoPreview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-slate-800/95 backdrop-blur-md border border-slate-700/50 rounded-lg max-w-md w-full overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setVideoPreview(null)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    ← Back
                  </Button>
                  <div>
                    <h2 className="text-xl font-bold text-white">{videoPreview.title}</h2>
                    <p className="text-slate-400 text-sm">Tutorial Video</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-6xl mb-4">🎥</div>
                <h3 className="text-lg font-bold text-white mb-2">Watch Tutorial Video</h3>
                <p className="text-slate-300 mb-6">{videoPreview.description}</p>

                <a
                  href={videoPreview.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full justify-center"
                  onClick={() => setVideoPreview(null)}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Watch on YouTube
                </a>

                <p className="text-xs text-slate-400 mt-3">Opens in new tab</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {quizModal && (
        <QuizModal
          lessonId={quizModal.lessonId}
          lessonTitle={quizModal.lessonTitle}
          quizData={quizData}
          onClose={closeQuiz}
        />
      )}
    </div>
  );
};

// Quiz Modal Component
const QuizModal = ({ lessonId, lessonTitle, quizData, onClose }: {
  lessonId: string;
  lessonTitle: string;
  quizData: any;
  onClose: () => void;
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number | boolean }>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);

  // Initialize quiz with random questions
  useEffect(() => {
    const lessonKey = lessonId.toLowerCase().replace(/\s+/g, '-');
    const quiz = quizData[lessonKey] || quizData["move-language-basics"]; // Fallback

    if (quiz && quiz.questions) {
      // Randomly select 5 questions from the pool
      const shuffled = [...quiz.questions].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(5, quiz.questions.length));
      setSelectedQuestions(selected);
    }
  }, [lessonId, quizData]);

  const handleAnswer = (questionId: string, answer: number | boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    selectedQuestions.forEach(question => {
      const userAnswer = answers[question.id];
      if (userAnswer === question.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: selectedQuestions.length };
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    // Re-randomize questions
    const lessonKey = lessonId.toLowerCase().replace(/\s+/g, '-');
    const quiz = quizData[lessonKey] || quizData["move-language-basics"];
    if (quiz && quiz.questions) {
      const shuffled = [...quiz.questions].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(5, quiz.questions.length));
      setSelectedQuestions(selected);
    }
  };

  if (selectedQuestions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-800/95 backdrop-blur-md border border-slate-700/50 rounded-lg p-6 max-w-md w-full text-center">
          <p className="text-white">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const { correct, total } = calculateScore();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-slate-800/95 backdrop-blur-md border border-slate-700/50 rounded-lg max-w-2xl w-full max-h-[95vh] overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onClose} className="border-slate-600 text-slate-300 hover:bg-slate-700">
                ← Back
              </Button>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">{lessonTitle} Quiz</h2>
                <p className="text-slate-400 text-sm">
                  {showResults ? `Results: ${correct}/${total} correct` : `Question ${currentQuestionIndex + 1} of ${selectedQuestions.length}`}
                </p>
              </div>
            </div>
          </div>

          {!showResults ? (
            <div className="space-y-6">
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">{currentQuestion.question}</h3>

                {currentQuestion.type === 'multiple-choice' && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option: string, index: number) => (
                      <label key={index} className="flex items-center gap-3 p-3 rounded-lg border border-slate-600 hover:border-slate-500 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name={currentQuestion.id}
                          value={index}
                          checked={answers[currentQuestion.id] === index}
                          onChange={() => handleAnswer(currentQuestion.id, index)}
                          className="text-blue-600"
                        />
                        <span className="text-slate-300">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'true-false' && (
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-600 hover:border-slate-500 cursor-pointer">
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        checked={answers[currentQuestion.id] === true}
                        onChange={() => handleAnswer(currentQuestion.id, true)}
                        className="text-blue-600"
                      />
                      <span className="text-slate-300">True</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-600 hover:border-slate-500 cursor-pointer">
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        checked={answers[currentQuestion.id] === false}
                        onChange={() => handleAnswer(currentQuestion.id, false)}
                        className="text-blue-600"
                      />
                      <span className="text-slate-300">False</span>
                    </label>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Previous
                </Button>
                <Button
                  onClick={nextQuestion}
                  disabled={answers[currentQuestion.id] === undefined}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600"
                >
                  {currentQuestionIndex === selectedQuestions.length - 1 ? 'Finish Quiz' : 'Next'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">
                {correct >= total * 0.7 ? '🎉' : correct >= total * 0.5 ? '👍' : '📚'}
              </div>
              <h3 className="text-2xl font-bold text-white">
                Quiz Complete!
              </h3>
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6">
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  {correct}/{total}
                </div>
                <p className="text-slate-300">
                  {correct >= total * 0.7
                    ? "Excellent! You have a strong understanding of the material."
                    : correct >= total * 0.5
                    ? "Good job! You might want to review some concepts."
                    : "Keep learning! Review the material and try again."}
                </p>
              </div>

              <div className="space-y-3">
                <Button onClick={restartQuiz} className="w-full bg-blue-600 hover:bg-blue-700">
                  Try Again (New Questions)
                </Button>
                <Button onClick={onClose} variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                  Back to Learning
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Learn;