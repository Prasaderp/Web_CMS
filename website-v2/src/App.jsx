import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop";
import './App.css';

// Component imports
import Hero from './components/Home Pages/Hero';
import Navbar from './components/Navbar';
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
import Footer from './components/Footer';
import OurPrinciples from './components/Nevbar Pages/OurPrinciples';
import OurTeam from './components/Nevbar Pages/ourteam';
import RND from './components/Nevbar Pages/research-development.jsx';

// ================= L&D Learning Pages =================
import Learning from "./components/Nevbar Pages/Learning-And-Development.jsx";
import DataEngineering from "./components/learning-and-development/data-engineering.jsx";
import DataAnalytics from "./components/learning-and-development/data-analytics.jsx";
import AIML from "./components/learning-and-development/ai-ml.jsx";
import GenerativeAI from "./components/learning-and-development/generative-ai.jsx";
import MLOps from "./components/learning-and-development/mlops.jsx";
import AgenticAI from "./components/learning-and-development/agentic-ai.jsx";

// Products page import
import Product from './components/Nevbar Pages/Product.jsx';
import SahayakAI from './components/Products Pages/SahayakAI.jsx';
import AIInterviewer from './components/Products Pages/AIInterviewer.jsx';
import VideoTranslation from './components/Products Pages/VideoTranslation.jsx';
import ProjectManagementTool from './components/Products Pages/ProjectManagementTool';

// Import your Blognevbar page
import Blognevbar from './components/Nevbar Pages/Blognevbar';
import BlogDetails from "./components/blogcontent Page/BlogDetails";

// Authentication imports
import AboutUs from './components/Nevbar Pages/aboutus';
import SignIn from './components/Nevbar Pages/SignIn';
import CreateAccount from './components/Home Pages/CreateAccount';
import ResetPassword from './components/Nevbar Pages/ResetPassword';
import MyAccount from './components/Nevbar Pages/MyAccount';

// Individual Service imports
import Services from './components/Nevbar Pages/Services';
import AIMLService from './components/Services Pages/AIMLService';
import GenerativeAIService from './components/Services Pages/GenerativeAIService';
import RoboticsService from './components/Services Pages/RoboticsService';
import HumanoidSystems from './components/Services Pages/HumanoidSystems';
import CybersecurityService from './components/Services Pages/CybersecurityService';
import DataEngineeringService from './components/Services Pages/DataEngineeringService';
import BlockchainService from './components/Services Pages/BlockchainService';
import Web3Service from './components/Services Pages/Web3Service';
import SoftwareDevelopmentService from './components/Services Pages/SoftwareDevelopmentService';
import IoTService from './components/Services Pages/IoTService';
import APIIntegrationService from './components/Services Pages/APIIntegrationService';


// Industries Pages
import Industries from './components/Nevbar Pages/Industries';
import Healthcare from "./components/industries/Healthcare";
import Finance from "./components/industries/Finance";
import Education from "./components/industries/Education";
import Enterprise from "./components/industries/Enterprise";
import Manufacturing from "./components/industries/Manufacturing";
import RetailEcommerce from "./components/industries/RetailEcommerce";



function App() {
  return (
    <Router>
  <ScrollToTop />
  <Navbar />
  <Routes>
        {/* Main Home Route */}
        <Route path="/" element={
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
        } />

        {/* About Route */}
        <Route path="/about" element={<AboutUs />} />

        {/* Principles Route */}
        <Route path="/principles" element={<OurPrinciples />} />

        {/* Team Route */}
        <Route path="/team" element={<OurTeam />} />

        {/* Blog routes */}
        <Route path="/blog" element={<Blognevbar />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />

        {/* R&D Routes */}
        <Route path="/research-development" element={<RND />} />
        
        {/* ================= L&D ROUTES ================= */}
        <Route path="/learning-and-development" element={<Learning />} />
        <Route path="/learning-and-development/data-engineering" element={<DataEngineering />} />
        <Route path="/learning-and-development/data-analytics" element={<DataAnalytics />} />
        <Route path="/learning-and-development/ai-ml" element={<AIML />} />
        <Route path="/learning-and-development/generative-ai" element={<GenerativeAI />} />
        <Route path="/learning-and-development/mlops" element={<MLOps />} />
        <Route path="/learning-and-development/agentic-ai" element={<AgenticAI />} />

        {/* Authentication Routes */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/my-account" element={<MyAccount />} />

        {/* Other Routes */}
        <Route path="/industries" element={<Industries />} />
        {/* Industries Routes */}
        <Route path="/industries/healthcare" element={<Healthcare />} />
        <Route path="/industries/finance" element={<Finance />} />
        <Route path="/industries/education" element={<Education />} />
        <Route path="/industries/enterprise-solutions" element={<Enterprise />} />
        <Route path="/industries/manufacturing" element={<Manufacturing />} />
        <Route path="/industries/retail-ecommerce" element={<RetailEcommerce />} />



        {/* Products Route */}
        <Route path="/products" element={<Product />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Services Routes */}
        <Route path="/services" element={<Services />} />
        <Route path="/services/generative-ai" element={<GenerativeAIService />} />
        <Route path="/services/robotics" element={<RoboticsService />} />
        <Route path="/services/humanoids" element={<HumanoidSystems />} />
        <Route path="/services/cybersecurity" element={<CybersecurityService />} />
        <Route path="/services/ai-ml" element={<AIMLService />} />
        <Route path="/services/data-engineering" element={<DataEngineeringService />} />
        <Route path="/services/web3" element={<Web3Service />} />
        <Route path="/services/blockchain" element={<BlockchainService />} />
        <Route path="/services/software-development" element={<SoftwareDevelopmentService />} />
        <Route path="/services/iot" element={<IoTService />} />
        <Route path="/services/api-integration" element={<APIIntegrationService />} />

        {/* Product detail routes */}
        <Route path="/products/sahayak-ai" element={<SahayakAI />} />
        <Route path="/products/video-translation" element={<VideoTranslation />} />
        <Route path="/products/ai-interviewer" element={<AIInterviewer />} />
        <Route path="/products/project-management" element={<ProjectManagementTool />} />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
