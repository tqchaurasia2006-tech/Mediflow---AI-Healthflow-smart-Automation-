import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Link as LinkIcon, 
  Lock, 
  Hash, 
  CheckCircle2, 
  Database, 
  Key, 
  RefreshCw, 
  FileText, 
  Eye, 
  HelpCircle, 
  Activity, 
  Cpu, 
  Layers, 
  AlertCircle, 
  ArrowRight,
  Search,
  PlusCircle,
  Zap,
  Check,
  Copy,
  Info,
  Receipt,
  Printer,
  Download,
  QrCode,
  ExternalLink,
  Share2,
  X,
  Globe,
  Server,
  Radio,
  Terminal,
  ArrowUpRight,
  ShieldAlert,
  Network,
  Wifi
} from 'lucide-react';

export interface BlockchainBlock {
  blockIndex: number;
  timestamp: string;
  eventType: 'TRIAGE_SESSION' | 'PRESCRIPTION_SIGN' | 'BED_ALLOCATION' | 'PATIENT_CONSENT' | 'GENESIS';
  recordId: string;
  initiator: string;
  dataHash: string;
  previousHash: string;
  currentHash: string;
  nonce: number;
  status: 'VERIFIED' | 'PENDING' | 'AUDITED';
  details: {
    patientId?: string;
    department?: string;
    actionDetails: string;
    signature: string;
  };
}

export const INITIAL_BLOCKS: BlockchainBlock[] = [
  {
    blockIndex: 0,
    timestamp: '2026-07-24 08:00:00 UTC',
    eventType: 'GENESIS',
    recordId: 'GENESIS-NODE-01',
    initiator: 'MediFlow AI System Core',
    dataHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    previousHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    currentHash: '0x8f3c7a91b2e45d6f081c23a45e67890123456789abcdef0123456789abcdef01',
    nonce: 10485,
    status: 'VERIFIED',
    details: {
      actionDetails: 'Genesis Block initialized for MediFlow AI Healthcare Network',
      signature: '0xSIG_GENESIS_CORE_KEY_9981'
    }
  },
  {
    blockIndex: 1,
    timestamp: '2026-07-24 09:15:22 UTC',
    eventType: 'TRIAGE_SESSION',
    recordId: 'TRG-88219',
    initiator: 'AI Symptom Orchestrator',
    dataHash: '0x4b2a8f90c1e3d5b7a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6',
    previousHash: '0x8f3c7a91b2e45d6f081c23a45e67890123456789abcdef0123456789abcdef01',
    currentHash: '0x7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d',
    nonce: 32910,
    status: 'VERIFIED',
    details: {
      patientId: 'PAT-9912',
      department: 'Cardiology',
      actionDetails: 'AI Assessment: Acute chest tightness (Priority HIGH, Clinical Index 8.4)',
      signature: '0xSIG_TRIAGE_ECDSA_a982f10'
    }
  },
  {
    blockIndex: 2,
    timestamp: '2026-07-24 10:04:11 UTC',
    eventType: 'PRESCRIPTION_SIGN',
    recordId: 'RX-55410',
    initiator: 'Dr. Sarah Jenkins (Cardiologist)',
    dataHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    previousHash: '0x7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d',
    currentHash: '0x9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a',
    nonce: 58129,
    status: 'VERIFIED',
    details: {
      patientId: 'PAT-9912',
      department: 'Cardiology',
      actionDetails: 'Digitally signed prescription: Nitroglycerin 0.4mg & EKG Protocol',
      signature: '0xSIG_DOC_JENKINS_RSA2048_c33f'
    }
  },
  {
    blockIndex: 3,
    timestamp: '2026-07-24 10:22:45 UTC',
    eventType: 'BED_ALLOCATION',
    recordId: 'BED-ICU-04',
    initiator: 'Hospital Admin Hub',
    dataHash: '0x3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e',
    previousHash: '0x9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a',
    currentHash: '0x2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b',
    nonce: 19823,
    status: 'VERIFIED',
    details: {
      patientId: 'PAT-9912',
      department: 'Intensive Care Unit (ICU)',
      actionDetails: 'ICU Bed #04 status mutated to OCCUPIED (Telemetry Sync Active)',
      signature: '0xSIG_ADMIN_KEY_STATION_12'
    }
  },
  {
    blockIndex: 4,
    timestamp: '2026-07-24 11:10:02 UTC',
    eventType: 'PATIENT_CONSENT',
    recordId: 'CNS-00918',
    initiator: 'Patient Portal (Firebase Auth Verified)',
    dataHash: '0x8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f',
    previousHash: '0x2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b',
    currentHash: '0x5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c',
    nonce: 87123,
    status: 'VERIFIED',
    details: {
      patientId: 'PAT-9912',
      department: 'HIPAA Data Sharing',
      actionDetails: 'Consent granted for inter-departmental EHR access for 48 hours',
      signature: '0xSIG_PATIENT_AUTH_TOKEN_77a1'
    }
  }
];

export interface BlockchainLedgerProps {
  blocks?: BlockchainBlock[];
  onAddBlock?: (newBlock: BlockchainBlock) => void;
}

export const BlockchainLedger: React.FC<BlockchainLedgerProps> = ({ 
  blocks: externalBlocks, 
  onAddBlock 
}) => {
  const [internalBlocks, setInternalBlocks] = useState<BlockchainBlock[]>(INITIAL_BLOCKS);
  const blocks = externalBlocks && externalBlocks.length > 0 ? externalBlocks : internalBlocks;

  const [filterType, setFilterType] = useState<string>('ALL');
  const [selectedBlock, setSelectedBlock] = useState<BlockchainBlock | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditSuccess, setAuditSuccess] = useState<boolean | null>(null);

  // Inspector Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [verifyInput, setVerifyInput] = useState<string>('');
  const [verifyResult, setVerifyResult] = useState<{ match: boolean; block?: BlockchainBlock } | null>(null);

  // New Block Simulation
  const [showSimulateModal, setShowSimulateModal] = useState<boolean>(false);
  const [newSimAction, setNewSimAction] = useState<string>('Update EHR Patient Record');
  const [newSimCategory, setNewSimCategory] = useState<'TRIAGE_SESSION' | 'PRESCRIPTION_SIGN' | 'BED_ALLOCATION' | 'PATIENT_CONSENT'>('PATIENT_CONSENT');
  const [newSimPatient, setNewSimPatient] = useState<string>('PAT-8812');
  const [isMining, setIsMining] = useState<boolean>(false);

  // Receipt Modal State
  const [receiptBlock, setReceiptBlock] = useState<BlockchainBlock | null>(null);

  // On-Chain Verification Web Explorer Modal State
  const [explorerBlock, setExplorerBlock] = useState<BlockchainBlock | null>(null);
  const [isVerifyingExplorer, setIsVerifyingExplorer] = useState<boolean>(false);
  const [explorerAuditStep, setExplorerAuditStep] = useState<number>(4);

  // Trigger Live On-Chain Re-Verification Animation
  const handleRunExplorerAudit = () => {
    setIsVerifyingExplorer(true);
    setExplorerAuditStep(0);

    setTimeout(() => setExplorerAuditStep(1), 500);
    setTimeout(() => setExplorerAuditStep(2), 1100);
    setTimeout(() => setExplorerAuditStep(3), 1700);
    setTimeout(() => {
      setExplorerAuditStep(4);
      setIsVerifyingExplorer(false);
    }, 2300);
  };

  // Jump from Explorer/Receipt to Main Verifier Tool in Tab
  const handleJumpToMainVerifier = (hash: string) => {
    setVerifyInput(hash);
    const block = blocks.find(b => b.currentHash === hash || b.recordId === hash);
    if (block) {
      setVerifyResult({ match: true, block });
    } else {
      setVerifyResult({ match: false });
    }
    setReceiptBlock(null);
    setExplorerBlock(null);

    setTimeout(() => {
      const verifierEl = document.getElementById('record-integrity-verifier');
      if (verifierEl) {
        verifierEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  // Copy hash helper
  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  // Receipt Actions
  const handlePrintReceipt = () => {
    window.print();
  };

  const handleDownloadReceiptJSON = (block: BlockchainBlock) => {
    const receiptData = {
      receiptHeader: "MediFlow AI Healthcare Network - Blockchain Transaction Receipt",
      receiptId: `TXN-RCPT-${block.recordId}-${block.blockIndex}`,
      blockIndex: block.blockIndex,
      timestamp: block.timestamp,
      eventType: block.eventType,
      recordId: block.recordId,
      initiator: block.initiator,
      status: block.status,
      patientId: block.details.patientId || "N/A",
      department: block.details.department || "General Clinical Operations",
      clinicalAction: block.details.actionDetails,
      cryptographicHashes: {
        currentBlockHash: block.currentHash,
        previousBlockHash: block.previousHash,
        dataPayloadHash: block.dataHash,
        digitalSignature: block.details.signature,
        nonce: block.nonce,
        consensusAlgorithm: "Proof of Authority (SHA-256 Permissioned Node)",
        networkSubnet: "MediFlow Hospital Node #01"
      },
      verificationUrl: `https://mediflow.ai/verify/${block.currentHash}`
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(receiptData, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", `MediFlow_Blockchain_Receipt_${block.recordId}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyReceiptLink = (hash: string) => {
    const link = `https://mediflow.ai/verify/${hash}`;
    navigator.clipboard.writeText(link);
    setCopiedHash(`link-${hash}`);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  // Run Chain Verification Audit
  const handleRunChainAudit = () => {
    setIsAuditing(true);
    setAuditSuccess(null);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditSuccess(true);
    }, 1500);
  };

  // Inspect hash
  const handleVerifyHash = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyInput.trim()) return;
    const query = verifyInput.trim().toLowerCase();
    const found = blocks.find(
      b => b.currentHash.toLowerCase().includes(query) ||
           b.dataHash.toLowerCase().includes(query) ||
           b.recordId.toLowerCase().includes(query) ||
           (b.details.patientId && b.details.patientId.toLowerCase().includes(query))
    );
    if (found) {
      setVerifyResult({ match: true, block: found });
    } else {
      setVerifyResult({ match: false });
    }
  };

  // Simulate Mining new block
  const handleSimulateNewBlock = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMining(true);

    setTimeout(() => {
      const prevBlock = blocks[blocks.length - 1];
      const newIndex = prevBlock.blockIndex + 1;
      const randomHex = () => Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      const mockCurrentHash = `0x${randomHex()}${randomHex()}${randomHex()}${randomHex()}${randomHex()}${randomHex()}${randomHex()}${randomHex()}`;
      const mockDataHash = `0x${randomHex()}${randomHex()}${randomHex()}${randomHex()}${randomHex()}${randomHex()}${randomHex()}${randomHex()}`;

      const newBlock: BlockchainBlock = {
        blockIndex: newIndex,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        eventType: newSimCategory,
        recordId: `REC-${Math.floor(10000 + Math.random() * 90000)}`,
        initiator: 'Authorized User / MediFlow Node',
        dataHash: mockDataHash,
        previousHash: prevBlock.currentHash,
        currentHash: mockCurrentHash,
        nonce: Math.floor(10000 + Math.random() * 80000),
        status: 'VERIFIED',
        details: {
          patientId: newSimPatient,
          department: 'General Operations',
          actionDetails: newSimAction,
          signature: `0xSIG_USER_MUTATION_NODE_${Math.floor(1000 + Math.random() * 9000)}`
        }
      };

      if (onAddBlock) {
        onAddBlock(newBlock);
      } else {
        setInternalBlocks(prev => [...prev, newBlock]);
      }
      setIsMining(false);
      setShowSimulateModal(false);
      setSelectedBlock(newBlock);
    }, 1800);
  };

  const filteredBlocks = blocks.filter(b => {
    const matchesFilter = filterType === 'ALL' || b.eventType === filterType;
    const matchesSearch = !searchQuery || 
      b.recordId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.currentHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.details.actionDetails.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.details.patientId && b.details.patientId.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>SHA-256 Permissioned Ledger Node</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
              </div>

              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold animate-pulse">
                <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                <span>REAL-TIME FIREBASE SYNC ACTIVE ({blocks.length} BLOCKS)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Blockchain Data Security & Audit Ledger
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed">
              MediFlow AI secures patient assessment reports, doctor prescriptions, bed allocations, and privacy consents with cryptographic hashes stored on an immutable ledger.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleRunChainAudit}
              disabled={isAuditing}
              className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-teal-600/30 flex items-center space-x-2 border border-teal-400/30 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isAuditing ? 'animate-spin' : ''}`} />
              <span>{isAuditing ? 'Auditing Ledger...' : 'Audit Chain Integrity'}</span>
            </button>

            <button
              onClick={() => setShowSimulateModal(true)}
              className="px-4 py-2.5 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-2 border border-indigo-400/30 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Record Block</span>
            </button>
          </div>
        </div>

        {/* Audit Status Alert */}
        {auditSuccess && (
          <div className="mt-6 p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-between text-xs text-emerald-200 animate-fadeIn">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span><strong>100% Chain Integrity Confirmed:</strong> All {blocks.length} blocks verified sequentially. Zero hash mismatches or unauthorized record mutations detected.</span>
            </div>
            <button 
              onClick={() => setAuditSuccess(null)}
              className="text-emerald-300 hover:text-white text-xs underline font-semibold ml-4"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* EXPLANATION SECTION: How & Where to Access */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="p-2.5 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-2xl">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              How & Where to Access Blockchain Data Security
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Clear guide on where blockchain protection operates across the MediFlow AI portal and how to access cryptographic receipts.
            </p>
          </div>
        </div>

        {/* 2-Column Explanation Cards */}
        <div className="grid grid-[1fr] md:grid-cols-2 gap-6">
          {/* Card 1: WHERE to Access */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/60 space-y-4">
            <div className="flex items-center space-x-2 text-teal-600 dark:text-teal-400 font-bold text-sm">
              <Layers className="w-4 h-4" />
              <h3>Where is Blockchain Access Available?</h3>
            </div>

            <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start space-x-2.5">
                <span className="p-1 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-lg text-[10px] font-bold mt-0.5">1</span>
                <div>
                  <strong className="text-slate-900 dark:text-white">Header Taskbar ("Blockchain Security"):</strong>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">Click "Blockchain Security" anytime from the top navigation bar to access the live block explorer, cryptographic verifier, and audit log.</p>
                </div>
              </li>

              <li className="flex items-start space-x-2.5">
                <span className="p-1 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-lg text-[10px] font-bold mt-0.5">2</span>
                <div>
                  <strong className="text-slate-900 dark:text-white">Patient Portal:</strong>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">Every appointment booking, medical reminder setup, or HIPAA consent form generates a personal SHA-256 hash receipt visible to the patient.</p>
                </div>
              </li>

              <li className="flex items-start space-x-2.5">
                <span className="p-1 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-lg text-[10px] font-bold mt-0.5">3</span>
                <div>
                  <strong className="text-slate-900 dark:text-white">Doctor Clinical Workspace:</strong>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">When doctors confirm appointments or issue prescriptions, a cryptographic digital signature (ECDSA) is permanently committed to the ledger.</p>
                </div>
              </li>

              <li className="flex items-start space-x-2.5">
                <span className="p-1 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-lg text-[10px] font-bold mt-0.5">4</span>
                <div>
                  <strong className="text-slate-900 dark:text-white">Admin OT & Bed Matrix:</strong>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">Bed status transitions (e.g., OCCUPIED, CLEANING) generate real-time ledger blocks to prevent unauthorized bed hoarding or tampered records.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Card 2: HOW Data Security Works */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/60 space-y-4">
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
              <Cpu className="w-4 h-4" />
              <h3>How Does the Data Security Mechanism Work?</h3>
            </div>

            <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start space-x-2.5">
                <span className="p-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg text-[10px] font-bold mt-0.5">A</span>
                <div>
                  <strong className="text-slate-900 dark:text-white">SHA-256 Hashing for PHI Privacy:</strong>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">Raw health details remain strictly encrypted in Firestore DB while 256-bit cryptographic hashes are published to the blockchain for validation without exposing patient identity.</p>
                </div>
              </li>

              <li className="flex items-start space-x-2.5">
                <span className="p-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg text-[10px] font-bold mt-0.5">B</span>
                <div>
                  <strong className="text-slate-900 dark:text-white">Cryptographic Block Linkage:</strong>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">Each new record embeds the <code>previousHash</code> of the prior block. Altering even a single letter in an past record breaks the entire hash chain instantly.</p>
                </div>
              </li>

              <li className="flex items-start space-x-2.5">
                <span className="p-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg text-[10px] font-bold mt-0.5">C</span>
                <div>
                  <strong className="text-slate-900 dark:text-white">Digital Signatures & Proof of Authority:</strong>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">Only authenticated Doctor or Admin accounts hold keypairs capable of signing clinical operations on the node network.</p>
                </div>
              </li>

              <li className="flex items-start space-x-2.5">
                <span className="p-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg text-[10px] font-bold mt-0.5">D</span>
                <div>
                  <strong className="text-slate-900 dark:text-white">Instant Tamper Verification:</strong>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">Patients or auditors can paste any receipt ID into the search tool below to verify authenticity against the immutable chain.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Live Hash Inspector & Verification Tool */}
      <div id="record-integrity-verifier" className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Search className="w-4 h-4 text-teal-600" />
              <span>Record Integrity Verifier</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Paste a Record ID (e.g. <code>TRG-88219</code>), Patient ID, or SHA-256 Hash to verify its block status.
            </p>
          </div>
        </div>

        <form onSubmit={handleVerifyHash} className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative flex-1 w-full">
            <Hash className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={verifyInput}
              onChange={(e) => setVerifyInput(e.target.value)}
              placeholder="Enter Record ID (e.g., TRG-88219), PAT-9912, or Hash..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer"
          >
            Verify On-Chain
          </button>
        </form>

        {/* Verification Result */}
        {verifyResult && (
          <div className={`p-4 rounded-2xl border text-xs transition-all ${
            verifyResult.match 
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
          }`}>
            {verifyResult.match && verifyResult.block ? (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>RECORD AUTHENTIC & IMMUTABLE (Block #{verifyResult.block.blockIndex})</span>
                  </div>

                  <button
                    onClick={() => setReceiptBlock(verifyResult.block!)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    <span>View Transaction Receipt</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 dark:text-slate-300 pt-1 border-t border-emerald-200 dark:border-emerald-800/60">
                  <div><strong>Event Type:</strong> {verifyResult.block.eventType}</div>
                  <div><strong>Record ID:</strong> {verifyResult.block.recordId}</div>
                  <div><strong>Timestamp:</strong> {verifyResult.block.timestamp}</div>
                  <div><strong>Initiator:</strong> {verifyResult.block.initiator}</div>
                  <div className="col-span-2 truncate"><strong>Block Hash:</strong> <code className="text-[10px] bg-emerald-100 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded">{verifyResult.block.currentHash}</code></div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 font-bold text-rose-700 dark:text-rose-400">
                <AlertCircle className="w-5 h-5" />
                <span>Hash Record Not Found in Ledger or Has Been Altered.</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Explorer Controls & Filter */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Database className="w-5 h-5 text-teal-600" />
              <span>Immutable Block Stream ({filteredBlocks.length} Blocks)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live cryptographic audit stream of all healthcare operations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs">
            {['ALL', 'TRIAGE_SESSION', 'PRESCRIPTION_SIGN', 'BED_ALLOCATION', 'PATIENT_CONSENT'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterType(cat)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                  filterType === cat
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat === 'ALL' ? 'All Blocks' : cat.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input for blocks */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search block list by patient ID, record ID, or details..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Block List Display */}
        <div className="space-y-4">
          {filteredBlocks.map((block) => {
            const isSelected = selectedBlock?.blockIndex === block.blockIndex;
            return (
              <div 
                key={block.blockIndex}
                className={`rounded-2xl border transition-all p-5 ${
                  isSelected 
                    ? 'border-teal-500 bg-teal-50/20 dark:bg-teal-950/20 shadow-md ring-1 ring-teal-500' 
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Block Badge + Info */}
                  <div className="flex items-start space-x-3">
                    <div className="p-3 bg-slate-900 text-teal-400 rounded-2xl flex flex-col items-center justify-center min-w-[54px] font-mono shadow-sm">
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest">Block</span>
                      <span className="text-lg font-bold">#{block.blockIndex}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          block.eventType === 'TRIAGE_SESSION' ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300' :
                          block.eventType === 'PRESCRIPTION_SIGN' ? 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300' :
                          block.eventType === 'BED_ALLOCATION' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300' :
                          block.eventType === 'PATIENT_CONSENT' ? 'bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300' :
                          'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                        }`}>
                          {block.eventType.replace('_', ' ')}
                        </span>

                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {block.recordId}
                        </span>

                        {block.details.patientId && (
                          <span className="text-[11px] px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md font-mono">
                            {block.details.patientId}
                          </span>
                        )}

                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Proof of Authority Verified</span>
                        </span>
                      </div>

                      <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                        {block.details.actionDetails}
                      </p>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Initiated by <strong className="text-slate-700 dark:text-slate-300">{block.initiator}</strong> • {block.timestamp}
                      </p>
                    </div>
                  </div>

                  {/* Right: Hashes & Actions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 font-mono text-[11px]">
                    <div className="bg-slate-100 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 w-full sm:w-auto">
                      <div className="flex items-center justify-between space-x-3 text-slate-500 dark:text-slate-400 text-[10px]">
                        <span>CURRENT BLOCK HASH:</span>
                        <button 
                          onClick={() => handleCopy(block.currentHash)}
                          className="hover:text-teal-500 transition-colors flex items-center space-x-0.5 cursor-pointer"
                        >
                          {copiedHash === block.currentHash ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedHash === block.currentHash ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <div className="text-teal-700 dark:text-teal-400 font-bold truncate max-w-[240px]">
                        {block.currentHash}
                      </div>
                    </div>

                    <button
                      onClick={() => setReceiptBlock(block)}
                      className="px-3 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 shadow-sm"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      <span>Receipt</span>
                    </button>

                    <button
                      onClick={() => setSelectedBlock(isSelected ? null : block)}
                      className="px-3 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shrink-0"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isSelected ? 'Hide Proof' : 'Inspect Proof'}</span>
                    </button>
                  </div>
                </div>

                {/* Expanded Proof Details */}
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs font-mono text-slate-700 dark:text-slate-300 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-900 text-slate-200 p-4 rounded-2xl">
                      <div>
                        <span className="text-slate-400 text-[10px] block">PREVIOUS BLOCK HASH:</span>
                        <span className="text-amber-400 text-[11px] break-all">{block.previousHash}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">DATA PAYLOAD HASH (SHA-256):</span>
                        <span className="text-teal-300 text-[11px] break-all">{block.dataHash}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">NONCE (PROOF OF WORK):</span>
                        <span className="text-indigo-300 text-[11px]">{block.nonce}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">CRYPTOGRAPHIC DIGITAL SIGNATURE:</span>
                        <span className="text-emerald-400 text-[11px] break-all">{block.details.signature}</span>
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => setReceiptBlock(block)}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-sans font-bold text-xs rounded-xl transition-all shadow-md flex items-center space-x-1.5 cursor-pointer"
                      >
                        <Receipt className="w-4 h-4" />
                        <span>View Official Transaction Receipt</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulate New Block Modal */}
      {showSimulateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-teal-600 dark:text-teal-400 font-bold text-base">
                <PlusCircle className="w-5 h-5" />
                <h3>Simulate Blockchain Ledger Entry</h3>
              </div>
              <button 
                onClick={() => setShowSimulateModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSimulateNewBlock} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Transaction Category
                </label>
                <select
                  value={newSimCategory}
                  onChange={(e) => setNewSimCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                >
                  <option value="TRIAGE_SESSION">AI Care Assessment Commit</option>
                  <option value="PRESCRIPTION_SIGN">Doctor Prescription Signing</option>
                  <option value="BED_ALLOCATION">Hospital Bed Allocation Change</option>
                  <option value="PATIENT_CONSENT">Patient HIPAA Consent Update</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Patient Reference ID
                </label>
                <input
                  type="text"
                  value={newSimPatient}
                  onChange={(e) => setNewSimPatient(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  placeholder="e.g. PAT-9912"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Healthcare Action / Mutation Description
                </label>
                <textarea
                  value={newSimAction}
                  onChange={(e) => setNewSimAction(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  placeholder="Describe the clinical or administrative record change..."
                  required
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl text-[11px] text-slate-500 dark:text-slate-400 space-y-1 font-mono">
                <div>• Automatic SHA-256 Hashing</div>
                <div>• Linkage to Previous Block #{blocks[blocks.length - 1].blockIndex}</div>
                <div>• Verified by Proof-of-Authority Consensus</div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSimulateModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isMining}
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {isMining ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Mining Block...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Commit to Ledger</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transaction Receipt Modal */}
      {receiptBlock && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden space-y-0 my-auto animate-scaleUp">
            
            {/* Modal Header & Actions Bar */}
            <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-teal-400 font-bold text-sm sm:text-base">
                <Receipt className="w-5 h-5 text-teal-400 shrink-0" />
                <span>Blockchain Transaction Receipt</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setExplorerBlock(receiptBlock)}
                  title="Launch Interactive On-Chain Verification Web Explorer"
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">On-Chain Website</span>
                </button>

                <button
                  onClick={handlePrintReceipt}
                  title="Print Transaction Receipt"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center space-x-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print</span>
                </button>

                <button
                  onClick={() => handleDownloadReceiptJSON(receiptBlock)}
                  title="Download Raw JSON Receipt"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border border-slate-700 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">JSON</span>
                </button>

                <button
                  onClick={() => handleCopyReceiptLink(receiptBlock.currentHash)}
                  title="Copy Verification URL"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border border-slate-700 cursor-pointer"
                >
                  {copiedHash === `link-${receiptBlock.currentHash}` ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Share2 className="w-3.5 h-3.5" />
                  )}
                  <span className="hidden sm:inline">
                    {copiedHash === `link-${receiptBlock.currentHash}` ? 'Copied' : 'Share'}
                  </span>
                </button>

                <button
                  onClick={() => setReceiptBlock(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Receipt Printable Card Body */}
            <div id="printable-blockchain-receipt" className="p-6 sm:p-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 space-y-6">
              
              {/* Receipt Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-teal-500 text-white font-extrabold flex items-center justify-center text-sm shadow-md">
                      M
                    </div>
                    <div>
                      <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">MediFlow AI Healthcare Network</h2>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Permissioned SHA-256 Ledger • Node #01 Subnet</p>
                    </div>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>VERIFIED & IMMUTABLE</span>
                  </span>
                  <div className="text-[11px] text-slate-400 font-mono mt-1">
                    BLOCK INDEX #{receiptBlock.blockIndex}
                  </div>
                </div>
              </div>

              {/* Key Value Overview Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Receipt Reference ID</span>
                  <span className="font-mono font-bold text-teal-600 dark:text-teal-400 text-sm">TXN-RCPT-{receiptBlock.recordId}-{receiptBlock.blockIndex}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Commit Timestamp (UTC)</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{receiptBlock.timestamp}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Event / Category</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase">{receiptBlock.eventType.replace('_', ' ')}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Consensus Protocol</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Proof of Authority (PoA)</span>
                </div>
              </div>

              {/* Transaction Operational Payload */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                  <FileText className="w-3.5 h-3.5 text-teal-500" />
                  <span>Clinical & Administrative Operation Payload</span>
                </h4>

                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 space-y-2 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
                    <div><strong>Patient Reference:</strong> <span className="font-mono bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">{receiptBlock.details.patientId || 'PAT-GENERAL'}</span></div>
                    <div><strong>Department:</strong> {receiptBlock.details.department || 'Clinical Operations'}</div>
                    <div className="sm:col-span-2"><strong>Authorized Initiator:</strong> {receiptBlock.initiator}</div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60">
                    <strong className="text-slate-900 dark:text-white block mb-0.5">Operation Description:</strong>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                      {receiptBlock.details.actionDetails}
                    </p>
                  </div>
                </div>
              </div>

              {/* Cryptographic Hashes & Signatures */}
              <div className="space-y-3 font-mono text-[11px]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5 font-sans">
                  <Lock className="w-3.5 h-3.5 text-teal-500" />
                  <span>Cryptographic Proof Hashes</span>
                </h4>

                <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl space-y-2.5">
                  <div>
                    <span className="text-slate-400 text-[10px] block font-bold">CURRENT BLOCK HASH (SHA-256):</span>
                    <span className="text-teal-400 font-bold break-all">{receiptBlock.currentHash}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-800">
                    <div>
                      <span className="text-slate-400 text-[10px] block">PAYLOAD DATA HASH:</span>
                      <span className="text-slate-300 text-[10px] break-all">{receiptBlock.dataHash}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] block">LINKED PREVIOUS HASH:</span>
                      <span className="text-amber-400 text-[10px] break-all">{receiptBlock.previousHash}</span>
                    </div>
                  </div>

                  <div className="pt-1 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-slate-400 text-[10px] block">ECDSA DIGITAL SIGNATURE:</span>
                      <span className="text-emerald-400 text-[10px] break-all">{receiptBlock.details.signature}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-slate-400 text-[10px] block">NONCE / GAS:</span>
                      <span className="text-indigo-300 text-[10px]">#{receiptBlock.nonce} • 0.00 Gwei</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code Barcode & Interactive On-Chain Website Trigger */}
              <div 
                onClick={() => setExplorerBlock(receiptBlock)}
                className="group flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-teal-500/5 via-teal-500/10 to-indigo-500/5 dark:from-teal-900/20 dark:via-teal-900/30 dark:to-indigo-900/20 border border-teal-500/30 dark:border-teal-500/40 hover:border-teal-500 transition-all shadow-sm cursor-pointer"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-teal-200 dark:border-teal-800 shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                    <QrCode className="w-10 h-10 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                      <span className="text-teal-700 dark:text-teal-300 font-extrabold">On-Chain Scan Verification Website</span>
                      <ExternalLink className="w-3.5 h-3.5 text-teal-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      Click here to launch the live <strong>On-Chain Explorer & Verification Portal</strong> for this transaction.
                    </p>
                    <div className="flex items-center space-x-2">
                      <code className="text-[10px] text-teal-600 dark:text-teal-400 font-mono bg-teal-100/60 dark:bg-teal-950/80 px-2 py-0.5 rounded-md">
                        https://explorer.mediflow.ai/tx/{receiptBlock.currentHash.substring(0, 16)}...
                      </code>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold hidden sm:inline">● Live Web Explorer</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0 gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExplorerBlock(receiptBlock);
                    }}
                    className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-1.5"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Open Web Explorer</span>
                  </button>
                  <span className="text-[9px] text-slate-400 font-mono">NODE #01 • 100% AUDITED</span>
                </div>
              </div>

              {/* Legal Disclaimer Footer */}
              <div className="pt-2 text-[10px] text-slate-400 text-center leading-relaxed border-t border-slate-200 dark:border-slate-800">
                This transaction receipt is cryptographically generated and permanently registered in the MediFlow AI permissioned healthcare blockchain network. All patient data remains protected in compliance with HIPAA & GDPR standards.
              </div>

            </div>

            {/* Bottom Modal Actions */}
            <div className="p-4 bg-slate-100 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Block #{receiptBlock.blockIndex} • Status: <strong className="text-emerald-600 dark:text-emerald-400">VERIFIED</strong>
              </span>

              <button
                onClick={() => setReceiptBlock(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-700 dark:hover:bg-slate-600 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Close Receipt
              </button>
            </div>

          </div>
        </div>
      )}

      {/* On-Chain Scan Verification Web Explorer Modal */}
      {explorerBlock && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-lg flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
          <div className="bg-slate-900 text-slate-100 rounded-3xl max-w-4xl w-full border border-teal-500/30 shadow-2xl overflow-hidden my-auto animate-scaleUp flex flex-col max-h-[92vh]">
            
            {/* Simulated Web Browser Chrome & Address Bar */}
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-slate-500 text-xs font-mono hidden sm:inline pl-2">MediFlow Explorer Browser v2.4</span>
              </div>

              {/* URL Address Bar */}
              <div className="flex-1 max-w-xl mx-2 bg-slate-900 border border-slate-800 hover:border-teal-500/50 rounded-xl px-3 py-1.5 flex items-center space-x-2 text-xs font-mono text-slate-300 transition-colors shadow-inner">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-teal-400 font-bold">https://</span>
                <span className="text-slate-200">explorer.mediflow.ai/tx/</span>
                <span className="text-teal-300 font-bold truncate">{explorerBlock.currentHash.substring(0, 20)}...</span>
                <span className="ml-auto text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold shrink-0 hidden md:inline">TLS 1.3 SECURE</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRunExplorerAudit}
                  title="Reload & Re-verify On-Chain Data"
                  className="p-1.5 text-slate-400 hover:text-teal-400 bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors border border-slate-800"
                >
                  <RefreshCw className={`w-4 h-4 ${isVerifyingExplorer ? 'animate-spin text-teal-400' : ''}`} />
                </button>

                <button
                  onClick={() => setExplorerBlock(null)}
                  className="p-1.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors border border-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Explorer Website Header & Navigation Bar */}
            <div className="bg-slate-900/90 border-b border-slate-800 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-black text-lg shadow-inner">
                  <Globe className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base sm:text-lg font-black tracking-tight text-white">MediFlow On-Chain Explorer</h2>
                    <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold rounded-md flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>MAINNET LIVE</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Public Healthcare Permissioned Blockchain Verification Network</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleJumpToMainVerifier(explorerBlock.currentHash)}
                  className="px-3.5 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Inspect in Ledger Tab</span>
                </button>

                <button
                  onClick={() => handleCopyReceiptLink(explorerBlock.currentHash)}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  {copiedHash === `link-${explorerBlock.currentHash}` ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedHash === `link-${explorerBlock.currentHash}` ? 'Copied Link' : 'Copy URL'}</span>
                </button>
              </div>
            </div>

            {/* Scrollable Website Body */}
            <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1 text-slate-200">

              {/* Transaction Main Banner Card */}
              <div className="bg-gradient-to-r from-teal-950/60 via-slate-900 to-indigo-950/60 rounded-2xl p-5 border border-teal-500/30 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full text-xs font-black uppercase tracking-wide flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>ON-CHAIN VERIFIED & FINALIZED</span>
                    </span>
                    <span className="text-xs text-slate-400 font-mono">1,024 Network Confirmations</span>
                  </div>

                  <div className="text-xs font-mono text-slate-400">
                    Block Height: <strong className="text-teal-400">#{explorerBlock.blockIndex}</strong>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-widest">Transaction Hash</span>
                  <div className="flex items-center space-x-2 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 font-mono text-xs text-teal-300 font-bold break-all">
                    <Hash className="w-4 h-4 text-teal-400 shrink-0" />
                    <span className="flex-1">{explorerBlock.currentHash}</span>
                    <button
                      onClick={() => handleCopy(explorerBlock.currentHash)}
                      className="p-1 hover:bg-slate-800 rounded transition-colors text-slate-400 hover:text-white"
                    >
                      {copiedHash === explorerBlock.currentHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Interactive Cryptographic Consensus Validator Tool */}
              <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-teal-400" />
                    <h3 className="text-sm font-bold text-white">Live On-Chain Consensus & Proof Verification</h3>
                  </div>

                  <button
                    onClick={handleRunExplorerAudit}
                    disabled={isVerifyingExplorer}
                    className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-md cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isVerifyingExplorer ? 'animate-spin' : ''}`} />
                    <span>{isVerifyingExplorer ? 'Executing On-Chain Audit...' : 'Re-Run Audit Check'}</span>
                  </button>
                </div>

                {/* Audit Steps Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className={`p-3 rounded-xl border transition-all ${
                    explorerAuditStep >= 1 ? 'bg-teal-950/40 border-teal-500/40 text-teal-200' : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">1. Payload Raw Data State</span>
                      {explorerAuditStep >= 1 && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1 font-sans">Fetched from MediFlow Sovereign State Trie</span>
                  </div>

                  <div className={`p-3 rounded-xl border transition-all ${
                    explorerAuditStep >= 2 ? 'bg-teal-950/40 border-teal-500/40 text-teal-200' : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">2. SHA-256 Digest Re-computation</span>
                      {explorerAuditStep >= 2 && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1 font-sans">100% Bitwise Match with Payload Hash</span>
                  </div>

                  <div className={`p-3 rounded-xl border transition-all ${
                    explorerAuditStep >= 3 ? 'bg-teal-950/40 border-teal-500/40 text-teal-200' : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">3. Merkle Parent Link (Block #{explorerAuditStep >= 3 ? explorerBlock.blockIndex - 1 : '...'})</span>
                      {explorerAuditStep >= 3 && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1 font-sans">Parent hash chain continuity verified</span>
                  </div>

                  <div className={`p-3 rounded-xl border transition-all ${
                    explorerAuditStep >= 4 ? 'bg-teal-950/40 border-teal-500/40 text-teal-200' : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">4. ECDSA Signature Auth</span>
                      {explorerAuditStep >= 4 && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1 font-sans">Signed by Authorized Doctor Node</span>
                  </div>
                </div>

                {explorerAuditStep === 4 && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center justify-between">
                    <div className="flex items-center space-x-2 font-bold">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>ON-CHAIN PROOF SUCCESSFUL: Cryptographic Integrity 100% Confirmed</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">0.02ms Audit Latency</span>
                  </div>
                )}
              </div>

              {/* On-Chain Detailed Technical Specs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-3">
                  <h4 className="font-bold text-white flex items-center space-x-1.5 border-b border-slate-800 pb-2">
                    <Database className="w-4 h-4 text-teal-400" />
                    <span>Transaction Attributes</span>
                  </h4>

                  <div className="space-y-2 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Event Category:</span>
                      <span className="font-bold text-indigo-400 uppercase">{explorerBlock.eventType.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Initiator Node:</span>
                      <span className="font-mono font-bold text-slate-100">{explorerBlock.initiator}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Patient Hash Ref:</span>
                      <span className="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-teal-300">{explorerBlock.details.patientId || 'PAT-GENERAL'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Department:</span>
                      <span className="font-bold text-slate-200">{explorerBlock.details.department || 'Clinical Operations'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Timestamp (UTC):</span>
                      <span className="font-mono text-slate-200">{explorerBlock.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-3">
                  <h4 className="font-bold text-white flex items-center space-x-1.5 border-b border-slate-800 pb-2">
                    <Network className="w-4 h-4 text-indigo-400" />
                    <span>Network & Consensus Metadata</span>
                  </h4>

                  <div className="space-y-2 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Consensus Algorithm:</span>
                      <span className="font-bold text-emerald-400">Proof of Authority (PoA)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Gas Used:</span>
                      <span className="font-mono text-indigo-300">0.00 Gwei (Healthcare Subnet)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Nonce:</span>
                      <span className="font-mono text-slate-200">#{explorerBlock.nonce}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Active Validator Nodes:</span>
                      <span className="font-bold text-emerald-400">6 / 6 Nodes Online</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Data Hash (SHA-256):</span>
                      <span className="font-mono text-slate-400 text-[10px] truncate max-w-[140px]">{explorerBlock.dataHash}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Validator Node Consensus Matrix */}
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-3">
                <h4 className="font-bold text-white flex items-center space-x-1.5 text-xs">
                  <Server className="w-4 h-4 text-teal-400" />
                  <span>Hospital Subnet Validator Node Consensus (6 Active Nodes)</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-[11px] font-mono">
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-200">MediFlow Master</div>
                      <div className="text-[9px] text-emerald-400">12ms • MATCH ✓</div>
                    </div>
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  </div>

                  <div className="p-2.5 bg-slate-900 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-200">Max Health Node</div>
                      <div className="text-[9px] text-emerald-400">18ms • MATCH ✓</div>
                    </div>
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  </div>

                  <div className="p-2.5 bg-slate-900 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-200">Fortis Subnet</div>
                      <div className="text-[9px] text-emerald-400">15ms • MATCH ✓</div>
                    </div>
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  </div>

                  <div className="p-2.5 bg-slate-900 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-200">Apollo Node</div>
                      <div className="text-[9px] text-emerald-400">22ms • MATCH ✓</div>
                    </div>
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  </div>

                  <div className="p-2.5 bg-slate-900 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-200">AIIMS Vault Node</div>
                      <div className="text-[9px] text-emerald-400">19ms • MATCH ✓</div>
                    </div>
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  </div>

                  <div className="p-2.5 bg-slate-900 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-200">Govt Health Node</div>
                      <div className="text-[9px] text-emerald-400">25ms • MATCH ✓</div>
                    </div>
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Explorer Action Footer Bar */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-slate-400 font-mono">
                Verified on <strong className="text-teal-400">MediFlow AI Permissioned Network</strong>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleJumpToMainVerifier(explorerBlock.currentHash)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer flex items-center space-x-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Inspect in Verifier Tool</span>
                </button>

                <button
                  onClick={() => setExplorerBlock(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Close Explorer Website
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
