import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Mail, FileText, ArrowRight, Code, BookOpen, Target, ChevronDown, Menu, X } from "lucide-react";
import { Section } from "./components/Section";
import { ProjectCard } from "./components/ProjectCard";
import { ExperienceItem } from "./components/ExperienceItem";
import { MacroAreaAccordion } from "./components/MacroAreaAccordion";
import { cn } from "@/src/lib/utils";

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -10 }}
    transition={{ duration: 0.3 }}
    className="w-full"
  >
    {children}
  </motion.div>
);

const Home = () => {
  const [isSummariesOpen, setIsSummariesOpen] = React.useState(false);

  return (
    <PageWrapper>
      <Section>
        <div className="pt-4">
          <div>
            {/* Bio & Info */}
            <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                <div className="shrink-0">
                  <img
                    src="/profile.jpg"
                    alt="Leonardo Tonelli"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-border/40"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h1 className="text-2xl md:text-4xl font-medium mb-4 text-ink leading-[1.1]">
                    Leonardo Tonelli
                  </h1>
                  <p className="text-base md:text-lg font-serif italic text-muted mb-6 leading-relaxed">
                    MSc Statistics student at EPFL, with a minor in Data Science. Currently a research intern at OIST.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <a href="mailto:leonardotonelli03@gmail.com" title="Contact" className="flex items-center justify-center w-10 h-10 bg-ink text-bg rounded-full hover:bg-ink/90 transition-all shadow-sm">
                      <Mail size={18} />
                    </a>
                    <a href="https://github.com/leonardotonelli" target="_blank" title="GitHub" className="flex items-center justify-center w-10 h-10 border border-border rounded-full text-ink hover:bg-border/20 transition-all shadow-sm">
                      <Github size={18} />
                    </a>
                    <a href="https://www.linkedin.com/in/leonardo-tonelli-640538237/" target="_blank" title="LinkedIn" className="flex items-center justify-center w-10 h-10 border border-border rounded-full text-ink hover:bg-border/20 transition-all shadow-sm">
                      <Linkedin size={18} />
                    </a>
                    <a href="/resume.pdf" target="_blank" title="CV" className="flex items-center justify-center w-10 h-10 border border-border rounded-full text-ink hover:bg-border/20 transition-all shadow-sm">
                      <FileText size={18} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="prose prose-ink prose-sm max-w-none mb-12">
                <p className="mb-4">
                  I study statistics and machine learning, with a current focus on representation learning, causal inference, and reinforcement learning. At OIST, I am working on action-conditioned JEPA image models and studying what they retain when future observations are uncertain.
                </p>
                <p className="mb-4">
                  Before EPFL, I completed a BSc in Economics, Management and Computer Science at Bocconi University and spent a semester at NTU Singapore. My bachelor thesis studied replicated optimization methods for the Binary Perceptron.
                </p>
              </div>

              {/* Paper Summaries (Embed) moved here */}
              <div className="mt-16">
                <button
                  onClick={() => setIsSummariesOpen(!isSummariesOpen)}
                  className="flex items-center gap-2 group mb-6"
                >
                  <h3 className={cn(
                    "text-[10px] uppercase tracking-[0.3em] font-bold transition-colors",
                    isSummariesOpen ? "text-accent" : "text-muted group-hover:text-ink"
                  )}>
                    PAPER SUMMARY
                  </h3>
                  <ChevronDown
                    size={14}
                    className={cn(
                      "text-muted transition-transform duration-300",
                      isSummariesOpen ? "text-accent rotate-180" : "group-hover:text-ink"
                    )}
                  />
                </button>

                <p className={cn(
                  "text-xs text-muted leading-relaxed font-serif w-full text-left",
                  isSummariesOpen && "mb-8"
                )}>
                  A small collection of papers I have read and summarized in my own words. Writing the summaries helps me check what I understood. There may be mistakes; I am still learning.
                </p>

                <AnimatePresence initial={false}>
                  {isSummariesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="bg-border/5 border border-border/40 rounded-2xl overflow-hidden shadow-sm h-[480px]">
                        <iframe
                          src="https://accessible-success-559.notion.site/ebd//3304e7287b8e8021a5cfd416f8c6608d?v=3304e7287b8e80edac42000c0c07029e"
                          className="w-full h-full"
                          frameBorder="0"
                          allowFullScreen
                          title="Notion Paper Summaries"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
          </div>
        </div>
      </Section>
    </PageWrapper>
  );
};

const Research = () => (
  <PageWrapper>
    <Section title="Research Interests">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 mb-16">
        <div className="flex gap-4">
          <div className="mt-1 text-accent"><Target size={20} /></div>
          <div>
            <h4 className="font-medium text-lg mb-1">Representation Learning</h4>
            <p className="text-sm text-muted">World models, joint-embedding methods, and useful invariances under uncertainty.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="mt-1 text-accent"><Code size={20} /></div>
          <div>
            <h4 className="font-medium text-lg mb-1">Statistical Machine Learning</h4>
            <p className="text-sm text-muted">Inference, optimization, and evaluation in high-dimensional learning problems.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="mt-1 text-accent"><BookOpen size={20} /></div>
          <div>
            <h4 className="font-medium text-lg mb-1">Causal Learning & RL</h4>
            <p className="text-sm text-muted">Interventions, reward identifiability, and learning across related environments.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="mt-1 text-accent"><ArrowRight size={20} /></div>
          <div>
            <h4 className="font-medium text-lg mb-1">Interpretability</h4>
            <p className="text-sm text-muted">Understanding learned representations and comparing circuits across models.</p>
          </div>
        </div>
      </div>

      <div className="prose prose-ink max-w-none">
        <h3 className="text-xl font-medium mb-4">Current work</h3>
        <p className="mb-6">
          At OIST, I am evaluating a ViT-based, action-conditioned JEPA world model on CIFAR-10, dSprites, and MPI3D. I use controlled interventions, compositional splits, retrieval metrics, and frozen linear probes to study which parts of a state the model keeps or ignores.
        </p>
        <p>
          Other recent work has covered frame-level multimodal hate localization, cross-model circuit alignment in language models, and reward identifiability in inverse reinforcement learning.
        </p>
      </div>
    </Section>
  </PageWrapper>
);

const Projects = () => (
  <PageWrapper>
    <Section title="Projects">
      <MacroAreaAccordion title="Deep Learning & NLP">
        <ProjectCard
          title="Frame-Level Multimodal Hate Localization"
          role="Deep Learning – EPFL"
          highlights={[
            "Built a frame-level video pipeline combining visual, audio, speech, and OCR features from SigLIP2, WavLM, Whisper, HateBERT, and EasyOCR.",
            "Compared fusion models and ablations; the full model reached 0.733 frame mAP and 0.852 AUC on HateMM."
          ]}
          tags={["PyTorch", "Multimodal Learning", "Video", "NLP"]}
        />
        <ProjectCard
          title="Cross-Model Circuit Alignment in Pythia LLMs"
          role="Modern NLP – EPFL"
          highlights={[
            "Studied whether attention-head circuits from Pythia-410M can help locate related circuits in Pythia-1B on the Indirect Object Identification task.",
            "Used CKA alignment and causal ablations; the results suggest alignment is useful as a lower-compute pre-filter, rather than a replacement for target-side attribution."
          ]}
          tags={["Mechanistic Interpretability", "Pythia", "CKA", "Causal Ablation"]}
          github="https://github.com/leonardotonelli/ModernNLP-CS552"
        />
      </MacroAreaAccordion>

      <MacroAreaAccordion title="Reinforcement Learning" defaultOpen={false}>
        <ProjectCard
          title="The Geometry of Reward Identifiability in IRL"
          role="Reinforcement Learning – EPFL"
          highlights={[
            "Studied when entropy-regularized expert behavior identifies a reward, across finite-horizon, infinite-horizon, and multi-environment MDPs.",
            "Connected access, rank, and graph-coverability conditions and derived extensions for multiple experts and approximate settings."
          ]}
          tags={["Inverse RL", "MaxEnt IRL", "MDPs", "Identifiability"]}
        />
        <ProjectCard
          title="Deep Q-Network (DQN) Reproduction"
          role="Head of Project – Hephaestus Applied AI"
          highlights={[
            "Led a team of three in reproducing the DQN architecture from Mnih et al. (2013) in PyTorch, Gymnasium, and NumPy.",
            "Trained and evaluated the agent on Demon Attack using experience replay, a target network, reward clipping, and ε-greedy exploration."
          ]}
          tags={["PyTorch", "Gymnasium", "CNN", "DQN", "Research Replication"]}
          github="https://github.com/leonardotonelli/dqn-atari"
        />
      </MacroAreaAccordion>

      <MacroAreaAccordion title="Optimization">
        <ProjectCard
          title="CIFAR-10 Optimizer Benchmark"
          role="Project Lead – Mathematics of Data, EPFL"
          highlights={[
            "Compared Adam, Muon, Scion, and Dion on CIFAR-10 using ResNet-18 and a small Vision Transformer.",
            "Built reproducible mixed-precision training and evaluation pipelines for convergence and validation accuracy."
          ]}
          tags={["PyTorch", "ResNet", "ViT", "Optimization", "Benchmarking"]}
          github="https://github.com/leonardotonelli/optimizers-CIFAR10"
        />
        <ProjectCard
          title="Replicated Approaches to the Binary Perceptron"
          role="Bachelor Thesis – Advisor: Prof. Luca Saglietti"
          highlights={[
            "Replicated entropy-based Binary Perceptron solvers using Replicated Simulated Annealing and Replicated Gradient Descent.",
            "Compared interacting-replica methods with standard baselines across problem sizes and constraint densities."
          ]}
          tags={["Statistical Mechanics", "MCMC", "Optimization Theory", "Python"]}
          github="https://github.com/leonardotonelli/bachelor-thesis"
        />
      </MacroAreaAccordion>

      <MacroAreaAccordion title="Statistical Machine Learning">
        <ProjectCard
          title="Manifold Learning Benchmark"
          role="Statistical Machine Learning – EPFL"
          highlights={[
            "Compared PCA, Isomap, LLE, Laplacian Eigenmaps, t-SNE, UMAP, and autoencoders on synthetic and real datasets.",
            "Measured local and global structure, downstream performance, stability, and out-of-sample behavior."
          ]}
          tags={["Manifold Learning", "t-SNE", "UMAP", "Autoencoders", "Benchmarking"]}
          github="https://github.com/leonardotonelli/non-linear-dim-reduction"
        />
        <ProjectCard
          title="Credit Scoring under Class Imbalance"
          role="Project Lead – Bocconi University"
          highlights={[
            "Compared resampling, cost-sensitive learning, and ensemble methods for a credit-default dataset with a 6.7% minority class.",
            "A boosted-tree model with random undersampling improved ROC-AUC from 0.8077 for logistic regression to 0.8582."
          ]}
          tags={["Scikit-Learn", "Imbalanced Learning", "Ensemble Methods", "Applied ML"]}
          github="https://github.com/leonardotonelli/credit-scoring"
        />
      </MacroAreaAccordion>

      <MacroAreaAccordion title="Statistical Inference">
        <ProjectCard
          title="Handling Incomplete Data: EM vs. Imputation"
          role="Statistical Computation Course Project"
          highlights={[
            "Compared EM, MICE, kNN, and baseline imputations under MCAR, MAR, and MNAR missingness.",
            "Implemented EM for multivariate-normal estimation and semi-supervised Gaussian mixtures, then tested the methods in simulation and on clinical data."
          ]}
          tags={["EM Algorithm", "MICE", "Inference", "Simulation Study"]}
          github="https://github.com/leonardotonelli/em-imputation"
        />
      </MacroAreaAccordion>
    </Section>
  </PageWrapper>
);

const Experience = () => (
  <PageWrapper>
    <Section title="Trajectory & Education">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-x-8 gap-y-12">
        <div>
          <h3 className="text-xs uppercase tracking-[0.3em] text-accent font-bold mb-8">Education</h3>
          <div className="space-y-8">
            <div className="relative pl-6 border-l border-border/60">
              <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-accent" />
              <h4 className="font-medium">MSc Statistics</h4>
              <p className="text-sm text-accent">EPFL, Lausanne</p>
              <p className="text-xs text-muted font-mono">2025 — Present</p>
              <p className="text-xs text-muted mt-1 italic">Minor in Data Science · GPA 5.55 / 6.0</p>
            </div>
            <div className="relative pl-6 border-l border-border/60">
              <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-accent" />
              <h4 className="font-medium">BSc Economics, Management & CS</h4>
              <p className="text-sm text-accent">Bocconi University</p>
              <p className="text-xs text-muted font-mono">2022 — 2025</p>
              <p className="text-xs text-muted mt-1 italic">110/110 Cum Laude</p>
            </div>
            <div className="relative pl-6 border-l border-border/60">
              <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-accent" />
              <h4 className="font-medium">Exchange Programme</h4>
              <p className="text-sm text-accent">NTU Singapore</p>
              <p className="text-xs text-muted font-mono">Jan — May 2025</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-[0.3em] text-accent font-bold mb-8">Experience</h3>
          <ExperienceItem
            title="Research Intern"
            organization="Okinawa Institute of Science and Technology"
            period="Jul — Sep 2026"
            location="Okinawa, Japan"
            link="https://www.oist.jp/"
            description={[
              "Studying how action-conditioned JEPA models represent state transitions when future observations are uncertain.",
              "Evaluating a ViT-based image world model with controlled interventions, compositional splits, retrieval metrics, and frozen linear probes."
            ]}
          />
          <ExperienceItem
            title="Research Assistant"
            organization="Bocconi University"
            period="Sep — Dec 2024"
            location="Milan, Italy"
            description={[
              "Analyzed randomized-trial data from about 1,200 participants and one million eye-tracking observations.",
              "Used ANOVA, regularized regression, and GLMs in reproducible Python workflows."
            ]}
          />
          <ExperienceItem
            title="Software Developer"
            organization="Obloo Ventures"
            period="Jun — Sep 2024"
            location="Milan, Italy"
            description={[
              "Built an NLP application for transcribing, summarizing, and extracting themes from venture-capital meetings.",
              "Contributed to a RAG workflow deployed with Docker, Streamlit, Groq, and Hugging Face tooling."
            ]}
          />
        </div>
      </div>
    </Section>
  </PageWrapper>
);

const NavItem = ({ to, label, onClick, mobile }: { to: string; label: string; onClick?: () => void; mobile?: boolean }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      cn(
        "relative py-2 text-xs font-medium transition-colors",
        isActive ? "text-ink" : "text-muted hover:text-ink",
        mobile && "text-sm py-3"
      )
    }
  >
    {({ isActive }) => (
      <>
        {label}
        {isActive && !mobile && (
          <motion.div
            layoutId="nav-underline"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        {isActive && mobile && (
          <motion.div
            layoutId="nav-dot"
            className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent"
          />
        )}
      </>
    )}
  </NavLink>
);

const AppContent = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Close menu when location changes
  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-bg selection:bg-accent/20">
      {/* Navigation */}
      <nav className="shrink-0 glass border-b border-border/40 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <NavLink to="/" className="font-serif text-lg font-medium tracking-tight">Leonardo Tonelli</NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            <NavItem to="/" label="Home" />
            <NavItem to="/research" label="Research" />
            <NavItem to="/projects" label="Projects" />
            <NavItem to="/experience" label="Experience" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted hover:text-ink transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden border-t border-border/20 bg-bg/95 backdrop-blur-md overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-2">
                <NavItem to="/" label="Home" mobile />
                <NavItem to="/research" label="Research" mobile />
                <NavItem to="/projects" label="Projects" mobile />
                <NavItem to="/experience" label="Experience" mobile />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-1">
        <div className={cn(
          "max-w-5xl mx-auto px-6 pt-8",
          location.pathname === "/" ? "pb-4" : "pb-16"
        )}>
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/research" element={<Research />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/experience" element={<Experience />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="shrink-0 py-6 border-t border-border/40" title="Tiny disclaimer: Codex helped build this site. Thanks, Codex.">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <p className="text-[9px] text-muted font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} Leonardo Tonelli
          </p>
          <p className="text-[9px] text-muted font-mono uppercase tracking-widest">
            EPFL MSc Statistics
          </p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
