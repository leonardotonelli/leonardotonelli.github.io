import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation, Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Mail, FileText, ArrowRight, Code, BookOpen, Target, ChevronRight, ChevronDown, ExternalLink, Menu, X } from "lucide-react";
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
  const [papers, setPapers] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isSummariesOpen, setIsSummariesOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch("/api/papers");
        if (!response.ok) throw new Error("Failed to fetch papers");
        const data = await response.json();
        setPapers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPapers();
  }, []);

  return (
    <PageWrapper>
      <Section>
        <div className="pt-4 pb-12">
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
                    MSc Statistics student at EPFL exploring the mathematical foundations of learning and statistical inference.
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
                  My academic journey is driven by a fundamental curiosity about how we can extract rigorous insights from complex data. I am currently pursuing an <strong>MSc in Statistics at EPFL</strong>, where I focus on the intersection of statistical computation, optimization, and deep learning.
                </p>
                <p className="mb-4">
                  Previously, I graduated Cum Laude from <strong>Bocconi University</strong> with a BSc in Economics and Computer Science. My undergraduate thesis, supervised by Prof. Luca Saglietti, explored the solution landscapes of the Binary Perceptron using replicated approaches.
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

                <p className="text-xs text-muted leading-relaxed mb-8 font-serif w-full text-left">
                  this is a little experiment of mine, where I summarize (when I have time) papers that I read/find interesting, briefly, using my own words. I am a firm believer that explaining something is the most effective way to test understanding, and in this time period where the temptation to have an LLM do your work is high, I think this is a good thinking exercise. Hope you don't mind mistakes along the way, I’m still learning :)
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
            <h4 className="font-medium text-lg mb-1">Statistical ML</h4>
            <p className="text-sm text-muted">Theoretical foundations of generalization, high-dimensional statistics, and inference in complex models.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="mt-1 text-accent"><Code size={20} /></div>
          <div>
            <h4 className="font-medium text-lg mb-1">Deep Learning & Optimization</h4>
            <p className="text-sm text-muted">Optimization dynamics in neural networks and Graph Neural Networks</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="mt-1 text-accent"><BookOpen size={20} /></div>
          <div>
            <h4 className="font-medium text-lg mb-1">Reinforcement Learning</h4>
            <p className="text-sm text-muted">Causal Reinforcement learning</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="mt-1 text-accent"><ArrowRight size={20} /></div>
          <div>
            <h4 className="font-medium text-lg mb-1">Causal Inference</h4>
            <p className="text-sm text-muted">Identification and estimation of causal effects from observational data and experimental design.</p>
          </div>
        </div>
      </div>

      <div className="prose prose-ink max-w-none">
        <h3 className="text-xl font-medium mb-4">Trajectory & Direction</h3>
        <p className="mb-6">
          Looking forward, my research direction is centered on the <strong>mathematical foundations of deep learning</strong>. I am particularly interested in how the geometry of the loss landscape influences the generalization capabilities of neural networks.
        </p>
        <p>
          During my time at EPFL, I aim to explore <strong>high-dimensional statistics</strong> and <strong>stochastic processes</strong> to better understand the implicit regularization effects of gradient-based optimization. My goal is to develop more interpretable and reliable ML systems that can perform under rigorous statistical guarantees.
        </p>
      </div>
    </Section>
  </PageWrapper>
);

const Projects = () => (
  <PageWrapper>
    <Section title="Selected Projects">
      <MacroAreaAccordion title="On going.." titleClassName="text-accent" defaultOpen={false}>
        <ProjectCard
          title="Temporal Hate Speech Detection"
          role="Deep Learning Course Project – EPFL"
          highlights={[
            "Developing a deep learning model to detect hate speech in temporal data streams",
            "Exploring recurrent architectures and attention mechanisms for sequential text analysis",
            "Analyzing the evolution of linguistic patterns in online discourse over time"
          ]}
          tags={["Deep Learning", "NLP", "Temporal Analysis", "PyTorch"]}
        />
        <ProjectCard
          title="Reinforcement Learning Project"
          role="RL Course Project – EPFL"
          highlights={[
            "Project details to be determined (TBD)",
            "Focusing on advanced RL algorithms and environment stabilization"
          ]}
          tags={["Reinforcement Learning", "TBD"]}
        />
        <ProjectCard
          title="Modern NLP Project"
          role="Modern NLP Course Project – EPFL"
          highlights={[
            "Project details to be determined (TBD)",
            "Exploring state-of-the-art transformer architectures and large language models"
          ]}
          tags={["NLP", "Transformers", "LLMs", "TBD"]}
        />
      </MacroAreaAccordion>

      <MacroAreaAccordion title="Reinforcement Learning" defaultOpen={false}>
        <ProjectCard
          title="Deep Q-Network (DQN) Reproduction"
          role="Head of Project – Hephaestus Applied AI"
          highlights={[
            "Led a team of 3 in reproducing the Deep Q-Network (DQN) architecture from Mnih et al. (2013), implementing the full training pipeline in PyTorch, Gymnasium, and NumPy",
            "Designed and trained a CNN-based Q-network with experience replay, target network stabilization, reward clipping, and ε-greedy exploration",
            "Conducted controlled experiments on Demon Attack, training for 1,000 episodes (~3 hours); analyzed convergence trends via Q-value and reward progression",
            "Evaluated model behavior through post-training simulations and state-value inspection",
            "Documented theoretical foundations and hyperparameter trade-offs in a 17-page technical report"
          ]}
          tags={["PyTorch", "Gymnasium", "CNN", "DQN", "Research Replication"]}
          github="https://github.com/leonardotonelli/Atari"
        />
      </MacroAreaAccordion>

      <MacroAreaAccordion title="Deep Learning & Optimization">
        <ProjectCard
          title="CIFAR-10 Optimizer Benchmark"
          role="Project Lead – Mathematics of Data, EPFL"
          highlights={[
            "Led a benchmarking study comparing Adam, Muon, Scion, and Dion optimizers on CIFAR-10 using ResNet-18 and ViT architecture",
            "Designed reproducible training pipelines in PyTorch with mixed-precision (AMP)",
            "Evaluated optimizer dynamics via training loss convergence and validation accuracy curves",
            "Observed Scion’s accelerated convergence on ResNet and competitive final accuracy",
            "Implemented modular architecture with custom optimizer interfaces and experiment logging"
          ]}
          tags={["PyTorch", "ResNet", "ViT", "Optimization", "Benchmarking"]}
        />
        <ProjectCard
          title="Replicated Approaches to the Binary Perceptron"
          role="Bachelor Thesis – Advisor: Prof. Luca Saglietti"
          highlights={[
            "Replicated and extended entropy-based learning algorithms for the Binary Perceptron (NP-hard problem)",
            "Derived and implemented Replicated Simulated Annealing (RSA) and Replicated Gradient Descent (RGD)",
            "Formalized interacting replica Hamiltonian and entropy-biased probability measures",
            "Conducted numerical experiments demonstrating consistent convergence improvements over non-interacting baselines",
            "Analyzed phase-transition behavior in solvability and solution landscape geometry"
          ]}
          tags={["Statistical Mechanics", "MCMC", "Optimization Theory", "Python"]}
        />
      </MacroAreaAccordion>

      <MacroAreaAccordion title="Machine Learning">
        <ProjectCard
          title="Manifold Learning Benchmark"
          role="Statistical Machine Learning – EPFL"
          highlights={[
            "Co-developed a unified benchmarking framework to systematically compare PCA, Isomap, LLE, Laplacian Eigenmaps, t-SNE, UMAP, and Autoencoders",
            "Designed large-scale hyperparameter grid searches with checkpointing and parallel execution",
            "Evaluated embeddings using Averaged Jaccard, Random Triplet Accuracy, k-NN accuracy, and StabAUC stability",
            "Quantified the local–global trade-off and analyzed downstream task performance in 2D embeddings"
          ]}
          tags={["Manifold Learning", "t-SNE", "UMAP", "Autoencoders", "Benchmarking"]}
        />
        <ProjectCard
          title="Credit Scoring under Class Imbalance"
          role="Project Lead – Bocconi University"
          highlights={[
            "Developed a credit default prediction model (minority class = 6.7%) using resampling and cost-sensitive learning",
            "Conducted full EDA and feature engineering, introducing domain-informed features like LatePaymentsFrequency",
            "Benchmarked Logistic Regression against ensemble methods; improved performance using Boosted Decision Trees",
            "Implemented and compared SMOTE, RUS, ROS, and Balanced Bagging"
          ]}
          tags={["Scikit-Learn", "Imbalanced Learning", "Ensemble Methods", "Applied ML"]}
          github="https://github.com/leonardotonelli/CreditScoring"
        />
      </MacroAreaAccordion>

      <MacroAreaAccordion title="Causal Inference">
        <ProjectCard
          title="Handling Incomplete Data: EM vs. Imputation"
          role="Statistical Computation Course Project"
          highlights={[
            "Designed a full-factorial simulation study comparing EM, MICE, kNN, and baseline imputations",
            "Implemented EM for Multivariate Normal parameter recovery and semi-supervised GMMs",
            "Evaluated estimation accuracy via L2 mean error and Frobenius covariance error",
            "Demonstrated EM’s theoretical optimality under MAR and quantified asymptotic bias under MNAR"
          ]}
          tags={["EM Algorithm", "MICE", "Inference", "Simulation Study"]}
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
            </div>
            <div className="relative pl-6 border-l border-border/60">
              <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-accent" />
              <h4 className="font-medium">BSc Economics & CS</h4>
              <p className="text-sm text-accent">Bocconi University</p>
              <p className="text-xs text-muted font-mono">2022 — 2025</p>
              <p className="text-xs text-muted mt-1 italic">110/110 Cum Laude</p>
            </div>
            <div className="relative pl-6 border-l border-border/60">
              <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-accent" />
              <h4 className="font-medium">Exchange Programme</h4>
              <p className="text-sm text-accent">NTU Singapore</p>
              <p className="text-xs text-muted font-mono">2025</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-[0.3em] text-accent font-bold mb-8">Experience</h3>
          <ExperienceItem
            title="Research Assistant"
            organization="Bocconi University"
            period="2024"
            description={[
              "Conducted statistical analyses on large-scale RCT experimental data (1,200 participants).",
              "Applied ANOVA, GLMs, and regularization techniques to decision-making behavior.",
              "Collaborated with faculty from Law and Political Science departments."
            ]}
          />
          <ExperienceItem
            title="AI Solutions Developer"
            organization="Obloo Ventures"
            period="2024"
            description={[
              "Developed AI-powered RAG architecture for transcription and topic extraction.",
              "Optimized meeting value extraction by 3x through automated indexing.",
              "Implemented Docker-based deployment pipelines for local LLM inference."
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
        <div className="max-w-5xl mx-auto px-6 pt-8 pb-16">
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

      <footer className="shrink-0 py-6 border-t border-border/40" title="Built with help from Codex">
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
