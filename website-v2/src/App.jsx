import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/layout/ErrorBoundary';

// Home page sections
import Hero from './components/Home Pages/Hero';
import TryOur from './components/Home Pages/Tryour';
import TrustedBy from './components/Home Pages/TrustedBy';
import Innovative from './components/Home Pages/innovative';
import ServicesSection from './components/Home Pages/ServicesSection';
import Work from './components/Home Pages/work';
import WhyChooseUs from './components/Home Pages/whychooseus';
import Testimonials from './components/Home Pages/Testimonials';
import ContactUs from './components/Home Pages/contactus';
import Blog from './components/Home Pages/blog';
import Faq from './components/Home Pages/faq';
import Industries from './components/Home Pages/Industries';
import Learning from './components/Home Pages/Learning';

// Lazily loaded page-level routes
const AboutUs = lazy(() => import('./components/Nevbar Pages/aboutus'));
const OurPrinciples = lazy(() => import('./components/Nevbar Pages/OurPrinciples'));
const OurTeam = lazy(() => import('./components/Nevbar Pages/ourteam'));
const RND = lazy(() => import('./components/Nevbar Pages/RD'));
const Services = lazy(() => import('./components/Nevbar Pages/Services'));

// Blog
const Blognevbar = lazy(() => import('./components/Nevbar Pages/Blognevbar'));
const BlogDetails = lazy(() => import('./components/blogcontent Page/BlogDetails'));

// R&D Section
const RoboticsAndHumanoids = lazy(() => import('./components/R&D Pages/RoboticsAndHumanoids'));
const CybersecurityAISystems = lazy(() => import('./components/R&D Pages/CybersecurityAISystems'));
const AIEthicsGovernance = lazy(() => import('./components/R&D Pages/AIEthicsGovernance'));
const KPIScalingAIProducts = lazy(() => import('./components/R&D Pages/KPIScalingAIProducts'));

// Industries
const FinanceIndustry = lazy(() => import('./components/Industries Pages/FinanceIndustry'));
const HealthcareIndustry = lazy(() => import('./components/Industries Pages/HealthcareIndustry'));
const EducationIndustry = lazy(() => import('./components/Industries Pages/EducationIndustry'));
const RetailIndustry = lazy(() => import('./components/Industries Pages/RetailIndustry'));
const ManufacturingIndustry = lazy(() => import('./components/Industries Pages/ManufacturingIndustry'));
const EnterpriseIndustry = lazy(() => import('./components/Industries Pages/EnterpriseIndustry'));

// Authentication
const SignIn = lazy(() => import('./components/Nevbar Pages/SignIn'));
const CreateAccount = lazy(() => import('./components/Home Pages/CreateAccount'));
const ResetPassword = lazy(() => import('./components/Nevbar Pages/ResetPassword'));
const MyAccount = lazy(() => import('./components/Nevbar Pages/MyAccount'));

// Individual Services
const AIMLService = lazy(() => import('./components/Services Pages/AIMLService'));
const GenerativeAIService = lazy(() => import('./components/Services Pages/GenerativeAIService'));
const DataEngineeringService = lazy(() => import('./components/Services Pages/DataEngineeringService'));
const BlockchainService = lazy(() => import('./components/Services Pages/BlockchainService'));
const Web3Service = lazy(() => import('./components/Services Pages/Web3Service'));
const SoftwareDevelopmentService = lazy(() => import('./components/Services Pages/SoftwareDevelopmentService'));
const IoTService = lazy(() => import('./components/Services Pages/IoTService'));
const HireDevService = lazy(() => import('./components/Services Pages/HireDevService'));
const AIStrategyService = lazy(() => import('./components/Services Pages/AIStrategyService'));
const AIAgentsService = lazy(() => import('./components/Services Pages/AIAgentsService'));

function App() {
  return (
    <Router>
      <Layout>
        <ErrorBoundary>
          <Suspense fallback={null}>
            <Routes>
            {/* Main Home Route */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <TryOur />
                  <Innovative />
                  <ServicesSection />
                  {/* <Work /> */}
                  <WhyChooseUs />
                  <Testimonials />
                  <ContactUs />
                  <Blog />
                  <Faq />
                  <TrustedBy />
                </>
              }
            />

            {/* About Route */}
            <Route path="/about" element={<AboutUs />} />

            {/* Principles Route */}
            <Route path="/principles" element={<OurPrinciples />} />

            {/* Team Route */}
            <Route path="/team" element={<OurTeam />} />

            {/* Blog Routes */}
            <Route path="/blog" element={<Blognevbar />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />

            {/* R&D Routes */}
            <Route path="/rd" element={<RND />} />
            <Route path="/rd/robotics-humanoids" element={<RoboticsAndHumanoids />} />
            <Route path="/rd/cybersecurity-ai-systems" element={<CybersecurityAISystems />} />
            <Route path="/rd/ai-ethics-governance" element={<AIEthicsGovernance />} />
            <Route path="/rd/kpis-scaling-ai-products" element={<KPIScalingAIProducts />} />

            {/* Authentication Routes */}
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/my-account" element={<MyAccount />} />

            {/* Industries Routes */}
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/finance" element={<FinanceIndustry />} />
            <Route path="/industries/healthcare" element={<HealthcareIndustry />} />
            <Route path="/industries/education-technology" element={<EducationIndustry />} />
            <Route path="/industries/retail-ecommerce" element={<RetailIndustry />} />
            <Route path="/industries/manufacturing-intelligence" element={<ManufacturingIndustry />} />
            <Route path="/industries/enterprise-solutions" element={<EnterpriseIndustry />} />
            <Route path="/l&d" element={<Learning />} />
            <Route path="/contact" element={<ContactUs />} />

            {/* Services Routes */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/generative-ai" element={<GenerativeAIService />} />
            <Route path="/services/ai-ml" element={<AIMLService />} />
            <Route path="/services/data-engineering" element={<DataEngineeringService />} />
            <Route path="/services/web3" element={<Web3Service />} />
            <Route path="/services/blockchain" element={<BlockchainService />} />
            <Route path="/services/software-development" element={<SoftwareDevelopmentService />} />
            <Route path="/services/hire-developers" element={<HireDevService />} />
            <Route path="/services/iot" element={<IoTService />} />
            <Route path="/services/ai-strategy" element={<AIStrategyService />} />
            <Route path="/services/ai-agents" element={<AIAgentsService />} />
            {/* Map the AI Development & Integration slug to existing AIMLService for now */}
            <Route path="/services/ai-development-integration" element={<AIMLService />} />
          </Routes>
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </Router>
  );
}

export default App;