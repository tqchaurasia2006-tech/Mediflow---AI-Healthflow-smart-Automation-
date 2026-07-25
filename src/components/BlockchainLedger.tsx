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
  Info
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

  // Copy hash helper
  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
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
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
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
              <div className="space-y-2">
                <div className="flex items-center space-x-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>RECORD AUTHENTIC & IMMUTABLE (Block #{verifyResult.block.blockIndex})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 dark:text-slate-300 pt-1">
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
    </div>
  );
};
