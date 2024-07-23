import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { AiOutlineMail } from "react-icons/ai";
import { useInView } from "react-intersection-observer";
import { PiTriangleLight, PiSquareLogo } from "react-icons/pi";
import { TbCircleSquare } from "react-icons/tb";
import { IoMdArrowForward } from "react-icons/io";
import "./LandingPage.css";
import { LuArrowDownLeftFromCircle } from "react-icons/lu";
import PricingCard from "../../components/Card/PricingCard";
import ReviewCard from "../../components/Card/ReviewCard";

const Card = ({
  icon,
  heading,
  details,
  readMoreLink,
  refProp,
  controls,
  initial,
  animate,
}) => (
  <motion.div
    ref={refProp}
    initial={initial}
    animate={controls}
    transition={{ duration: 0.7, delay: 0.2 }}
    whileHover={{
      scale: 1.1,
      backgroundColor: "black",
      color: "white",
    }}
    className="card text-center custom-shadow rounded-4 h-100 py-4 w-50"
  >
    <div className="card-icon mb-4 fs-2 d-flex align-items-center justify-content-center">
      <p
        className="px-3 py-2 rounded-circle mb-0"
        style={{ backgroundColor: "#E3E2FD" }}
      >
        {icon}
      </p>
    </div>
    <div className="card-body">
      <h5 className="card-heading fw-bold mb-3">{heading}</h5>
      <p className="card-details text-secondary text-sm fs-09rem mb-5">
        {details}
      </p>
      <a
        href={readMoreLink}
        className="text-secondary text-decoration-none fw-bold"
      >
        Read More <IoMdArrowForward />
      </a>
    </div>
  </motion.div>
);

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  const controls = useAnimation();
  const controlsLeftCard = useAnimation();
  const controlsRightCard = useAnimation();
  const controlsCenterCard = useAnimation();

  const [refLeftCard, inViewLeftCard] = useInView();
  const [refRightCard, inViewRightCard] = useInView();
  const [refCenterCard, inViewCenterCard] = useInView();
  const [refLogo1, inViewLogo1] = useInView();
  const [refLogo2, inViewLogo2] = useInView();
  const [refLogo3, inViewLogo3] = useInView();
  // const [refAnimatedDiv, inViewAnimatedDiv] = useInView();
  const { ref: refLeftSection, inView: inViewLeftSection } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [sectionRef, inViewSection] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [imageRef, inViewImage] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [headingRef, inViewHeading] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [divRef, inViewdiv] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [cardLeftRef, inViewCardLeft] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [cardRightref, inViewCardRight] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [reviewCardVariantsRef, inViewReviewCardVariants] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [reviewCardVariantsRightRef, inViewReviewCardVariantsRight] = useInView(
    { triggerOnce: true, threshold: 0.1 }
  );

  const [reviewCardVariantsCenterRef, inViewReviewCardVariantsCenter] =
    useInView({ triggerOnce: true, threshold: 0.1 });

  const [h1ReviewVariantsRef, inViewH1ReviewVariants] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [helpHeadingVarintsRef, inViewHelpHeadingVariants] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sectionVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -300, y: -300 },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -100, rotateX: 180 },
    visible: { opacity: 1, y: 0, rotateX: 0 },
  };

  const divVariants = {
    hidden: { opacity: 0, y: -100, rotateX: 180 },
    visible: { opacity: 1, y: 0, rotateX: 0 },
  };

  const cardLeftVariants = {
    hidden: { opacity: 0, x: -100, rotate: -10 },
    visible: { opacity: 1, x: 0, rotate: 0 },
  };

  const cardRightVariants = {
    hidden: { opacity: 0, x: 100, rotate: 10 },
    visible: { opacity: 1, x: 0, rotate: 0 },
  };

  const reviewCardVariants = {
    hidden: { opacity: 0, x: -200, rotate: -40 },
    visible: { opacity: 1, x: 0, rotate: 0 },
  };

  const reviewCardVariantsRight = {
    hidden: { opacity: 0, x: 200, rotate: 40 },
    visible: { opacity: 1, x: 0, rotate: 0 },
  };

  const reviewCardVariantsCenter = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  const h1ReviewVariants = {
    hidden: { opacity: 0, y: -200 },
    visible: { opacity: 1, y: 0 },
  };

  const helpHeadingVarints = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 2000);
  }, []);

  useEffect(() => {
    if (inViewLeftCard) {
      controlsLeftCard.start({
        x: 0,
        opacity: 1,
        rotate: 0,
        transition: { duration: 0.7, delay: 0.2 },
      });
    }
  }, [controlsLeftCard, inViewLeftCard]);

  useEffect(() => {
    if (inViewRightCard) {
      controlsRightCard.start({
        x: 0,
        opacity: 1,
        rotate: 0,
        transition: { duration: 0.7, delay: 0.2 },
      });
    }
  }, [controlsRightCard, inViewRightCard]);

  useEffect(() => {
    if (inViewCenterCard) {
      controlsCenterCard.start({
        y: 0,
        opacity: 1,
        rotate: 0,
        transition: { duration: 0.7, delay: 0.2 },
      });
    }
  }, [controlsCenterCard, inViewCenterCard]);

  useEffect(() => {
    if (inViewLogo1) {
      controls.start({
        scale: 1,
        opacity: 1,
        // y: 0,
        transition: { duration: 0.7, delay: 0.4 },
      });
    }
  }, [controls, inViewLogo1]);

  useEffect(() => {
    if (inViewLogo2) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: 0.4 },
      });
    }
  }, [controls, inViewLogo2]);

  useEffect(() => {
    if (inViewLogo3) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: 0.4 },
      });
    }
  }, [controls, inViewLogo3]);

  return (
    <>
      <div className="gradient-bg">
        <div className="container-xl min-vh-100 h-100">
          <motion.nav
            className="d-flex align-items-center justify-content-between py-4 text-white"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
          >
            <h1 className="body">empsuite</h1>
            <ul className="d-flex align-items-center gap-5 list-unstyled mb-0">
              <li className="cursor-pointer">Product</li>
              <li className="cursor-pointer">Solution</li>
              <li className="cursor-pointer">Customer</li>
              <li className="cursor-pointer">Pricing</li>
              <li className="cursor-pointer">About Us</li>
            </ul>
            <button className="rounded-pill px-4 py-2 fw-bold fs-5 border-0">
              Get Started
            </button>
          </motion.nav>

          <div
            className="d-flex flex-direction-column align-items-center justify-content-center gap-4 text-white"
            style={{ minHeight: "38rem" }}
          >
            <div className="text-center text-wrap">
              <motion.h1
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                style={{
                  fontSize: "4.7rem",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
                className="fw-bold"
              >
                Empower Your Workforce
              </motion.h1>
              <motion.h1
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut", delay: 2 }}
                style={{
                  fontSize: "4.7rem",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
                className="fw-bold"
              >
                {isVisible && "Smart Tracking"}
              </motion.h1>
            </div>
            <div>
              <p className="fs-5 mb-0">
                Our cutting-edge employee tracking app designed to
              </p>
              <p className="fs-5">
                streamline workforce management like never before.
              </p>
            </div>

            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
              className="rounded-pill py-2 ps-4 pe-2 bg-white d-flex align-items-center justify-content-between w-50"
            >
              <div className="w-50">
                <AiOutlineMail className="fs-4 text-secondary" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border-0 w-75 py-2 px-4 outline-0"
                />
              </div>
              <button
                className="rounded-pill px-5 py-3 border-0 text-white"
                style={{
                  background: "linear-gradient(to right, #777777, #333333)",
                }}
              >
                Start for free
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      <main className="container-xl min-vh-100 h-100">
        <div className="flex justify-content-center align-items-center">
          <motion.div>
            <motion.img
              src="src/assets/Dashboard (Dark Mode)@2x.svg"
              alt="Dashboard"
              style={{
                maxWidth: "100%",
                height: "auto",
                transformOrigin: "center",
              }}
            />
          </motion.div>
        </div>

        <div
          className="d-flex align-items-center justify-content-evenly"
          style={{ marginBottom: "8rem" }}
        >
          <motion.img
            ref={refLogo1}
            src="src/assets/logos_google-workspace.svg"
            alt=""
            initial={{ opacity: 0, y: -50 }}
            animate={controls}
            transition={{ duration: 1, delay: 0.2 }}
          />
          <motion.img
            ref={refLogo2}
            src="src/assets/image 3.svg"
            alt=""
            initial={{ opacity: 0, y: -50 }}
            animate={controls}
            transition={{ duration: 1, delay: 0.4 }}
          />
          <motion.img
            ref={refLogo3}
            src="src/assets/image 5.svg"
            alt=""
            initial={{ opacity: 0, y: -50 }}
            animate={controls}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </div>

        <div className="text-center mb-5">
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={controls}
            transition={{ duration: 0.7, delay: 0.8 }}
            style={{
              fontSize: "3.3rem",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
            className="fw-bold"
          >
            Say Goodbye To Manual
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={controls}
            transition={{ duration: 0.7, delay: 1 }}
            style={{
              fontSize: "3.3rem",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
            className="fw-bold"
          >
            Tracking Methods!
          </motion.h1>
        </div>

        <div
          className="card-list d-flex align-items-center gap-5"
          style={{ marginBlockEnd: "15rem" }}
        >
          <Card
            icon={<PiTriangleLight />}
            heading="Employee Tracking"
            details="Effortlessly Monitor Progress Employee Tracking Made Simple."
            readMoreLink="#"
            refProp={refLeftCard}
            controls={controlsLeftCard}
            initial={{ x: -200, opacity: 0, rotate: -10 }}
            animate={controlsLeftCard}
          />
          <Card
            icon={<TbCircleSquare />}
            heading="Project Management"
            details="Navigate Projects with Precision, Your Path to Success Starts Here."
            readMoreLink="#"
            refProp={refCenterCard}
            controls={controlsCenterCard}
            initial={{ y: 50, opacity: 0 }}
            animate={controlsCenterCard}
          />
          <Card
            icon={<PiSquareLogo />}
            heading="Staff Management"
            details="Crafting Strategies for Your Workforce Introducing Staff Management, Your Business's Personnel Planner."
            readMoreLink="#"
            refProp={refRightCard}
            controls={controlsRightCard}
            initial={{ x: 200, opacity: 0, rotate: 10 }}
            animate={controlsRightCard}
          />
        </div>

        <div className="pt-5 d-flex gap-5" style={{ marginBlockEnd: "5rem" }}>
          <motion.div
            ref={refLeftSection}
            initial={{ x: -200, opacity: 0 }}
            animate={{
              x: inViewLeftSection ? 0 : -200,
              opacity: inViewLeftSection ? 1 : 0,
            }}
            transition={{ duration: 1 }}
            className="pe-5"
          >
            <h1 className="mb-5 fw-bold fs-1">
              Embrace the future of Employee management
            </h1>
            <p className="mb-5">
              From tracking time and attendance to monitoring project progress
              and task assignments, our app provides a comprehensive solution
              for businesses of all sizes.
            </p>
            <button
              className="rounded-pill px-5 py-3 border-0 text-white fw-bold"
              style={{
                background: "linear-gradient(to right, #777777, #333333)",
              }}
            >
              GET STARTED
            </button>
          </motion.div>
          <div
            className="position-relative"
            style={{ width: "85.5%", height: "30rem" }}
          >
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{
                y: inViewLeftSection ? 0 : 200,
                opacity: inViewLeftSection ? 1 : 0,
              }}
              transition={{ duration: 1 }}
              className="p-5 gradient-bg-reverse rounded-4"
              style={{ width: "100%", height: "100%" }}
            ></motion.div>
            <div
              className="position-absolute start-0"
              style={{ top: "-10.4rem" }}
            >
              <motion.img
                src="src/assets/digital-service2 1.svg"
                alt=""
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </main>
      <div className="gradient-bg" style={{ marginBlockEnd: "9rem" }}>
        <div className="container py-5 text-white">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <motion.h1
              style={{ fontSize: "3rem", paddingInlineEnd: "8.9rem" }}
              initial="hidden"
              animate={inViewSection ? "visible" : "hidden"}
              variants={sectionVariants}
              transition={{ duration: 1 }}
              ref={sectionRef}
            >
              Real-time insights into employee activities
            </motion.h1>
            <button className="rounded-pill px-4 py-3 fw-bold fs-5 border-0 text-nowrap">
              Get Started Now
            </button>
          </div>
          <div className="d-flex justify-content-between py-5">
            <ol className="custom-list">
              <li>
                <h4 className="mb-3 fw-bold">Create Account</h4>
                <p>Lorem, ipsum.</p>
              </li>
              <li>
                <h4 className="mb-3 fw-bold">Invite Employees</h4>
                <p>Lorem, ipsum.</p>
              </li>
              <li>
                <h4 className="mb-3 fw-bold">Track Performance</h4>
                <p>Lorem, ipsum.</p>
              </li>
            </ol>
            <motion.div
              initial="hidden"
              animate={inViewImage ? "visible" : "hidden"}
              variants={imageVariants}
              transition={{ duration: 1 }}
              ref={imageRef}
            >
              <img src="src/assets/Group 33603.svg" alt="" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container">
        <motion.h1
          className="fw-bold text-center mb-4"
          style={{ fontSize: "3rem" }}
          animate={inViewHeading ? "visible" : "hidden"}
          variants={headingVariants}
          transition={{ duration: 1 }}
          ref={headingRef}
        >
          Results First, Choose Your Plan Later!
        </motion.h1>

        <motion.div
          className="d-flex align-items-end justify-content-center gap-4"
          style={{ marginBlockEnd: "4rem" }}
          ref={divRef}
          animate={inViewdiv ? "visible" : "hidden"}
          variants={divVariants}
          transition={{ duration: 1 }}
        >
          <button
            className="rounded-pill px-3 py-1 border-0 text-white"
            style={{
              background: "linear-gradient(to right, #777777, #333333)",
            }}
          >
            Monthly
          </button>
          <p className="mb-0">Annually</p>
          <p className="mb-0">
            <LuArrowDownLeftFromCircle style={{ fontSize: "3rem" }} />
            <span>Get 20% OFF</span>
          </p>
        </motion.div>

        <div className="row g-3" style={{ marginBlockEnd: "9rem" }}>
          <motion.div
            className="col-3"
            ref={cardLeftRef}
            animate={inViewCardLeft ? "visible" : "hidden"}
            variants={cardLeftVariants}
            transition={{ duration: 1 }}
          >
            <PricingCard
              type="Basic Plan"
              pricing="29"
              audience="Individuals"
              features={["Lorem lorem", "Lorem lorem", "Lorem lorem"]}
            />
          </motion.div>
          <motion.div
            className="col-3"
            ref={cardLeftRef}
            animate={inViewCardLeft ? "visible" : "hidden"}
            variants={cardLeftVariants}
            transition={{ duration: 1 }}
          >
            <PricingCard
              type="Basic Plan"
              pricing="29"
              audience="Individuals"
              features={["Lorem lorem", "Lorem lorem", "Lorem lorem"]}
            />
          </motion.div>
          <motion.div
            className="col-3"
            ref={cardRightref}
            animate={inViewCardRight ? "visible" : "hidden"}
            variants={cardRightVariants}
            transition={{ duration: 1 }}
          >
            <PricingCard
              type="Basic Plan"
              pricing="29"
              audience="Individuals"
              features={["Lorem lorem", "Lorem lorem", "Lorem lorem"]}
            />
          </motion.div>
          <motion.div
            className="col-3"
            ref={cardRightref}
            animate={inViewCardRight ? "visible" : "hidden"}
            variants={cardRightVariants}
            transition={{ duration: 1 }}
          >
            <PricingCard
              type="Basic Plan"
              pricing="29"
              audience="Individuals"
              features={["Lorem lorem", "Lorem lorem", "Lorem lorem"]}
            />
          </motion.div>
        </div>

        <div style={{ marginBlockEnd: "8rem" }}>
          <motion.h1
            className="fw-bold text-center mb-5"
            style={{ fontSize: "3rem" }}
            ref={h1ReviewVariantsRef}
            animate={inViewH1ReviewVariants ? "visible" : "hidden"}
            variants={h1ReviewVariants}
            transition={{ duration: 0.7 }}
          >
            See What Our Clients Are Saying
          </motion.h1>
          <div className="row">
            <div className="col-md-4">
              <motion.div
                ref={reviewCardVariantsRef}
                animate={inViewReviewCardVariants ? "visible" : "hidden"}
                variants={reviewCardVariants}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <ReviewCard
                  rating={4}
                  reviewMessage="This is an amazing product! Highly recommend it. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus dolorem quaerat, amet nisi sapiente explicabo quidem!"
                  userImage="https://via.placeholder.com/50"
                  userName="John Doe"
                  userAddress="123 Main St, Springfield, USA"
                />
              </motion.div>
            </div>
            <div className="col-md-4">
              <motion.div
                ref={reviewCardVariantsCenterRef}
                animate={inViewReviewCardVariantsCenter ? "visible" : "hidden"}
                variants={reviewCardVariantsCenter}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <ReviewCard
                  rating={4}
                  reviewMessage="This is an amazing product! Highly recommend it. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus dolorem quaerat, amet nisi sapiente explicabo quidem!"
                  userImage="https://via.placeholder.com/50"
                  userName="John Doe"
                  userAddress="123 Main St, Springfield, USA"
                />
              </motion.div>
            </div>
            <div className="col-md-4">
              <motion.div
                ref={reviewCardVariantsRightRef}
                animate={inViewReviewCardVariantsRight ? "visible" : "hidden"}
                variants={reviewCardVariantsRight}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <ReviewCard
                  rating={4}
                  reviewMessage="This is an amazing product! Highly recommend it. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus dolorem quaerat, amet nisi sapiente explicabo quidem!"
                  userImage="https://via.placeholder.com/50"
                  userName="John Doe"
                  userAddress="123 Main St, Springfield, USA"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-black text-white">
        <div className="border-milky">
          <motion.div
            style={{ paddingBlock: "4rem" }}
            ref={helpHeadingVarintsRef}
            animate={inViewHelpHeadingVariants ? "visible" : "hidden"}
            variants={helpHeadingVarints}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="mb-5  container">
              <h1 className="text-center fw-bold" style={{ fontSize: "4rem" }}>
                We are here to help
              </h1>
              <h1 className="text-center fw-bold" style={{ fontSize: "4rem" }}>
                {" "}
                you grow your business
              </h1>
            </div>
            <div className="text-center  container">
              <button className="rounded-pill px-4 py-3 fw-bold fs-5 border-0 text-nowrap text-center">
                Get Started Now
              </button>
            </div>
          </motion.div>
        </div>
        <div className="border-milky" style={{ paddingBlock: "4rem" }}>
          <div className="container d-flex justify-content-between">
            <div>
              <h1 className="body mb-3">empsuite</h1>
              <p className="mb-0 text-milky fs-5">Empower Your Workforce:</p>
              <p className="mb-0 text-milky text-center fs-5">
                Smart Tracking, Seamless
              </p>
              <p className="text-center text-milky fs-5">Performance</p>
            </div>

            <div className="d-flex align-items-center gap-5">
              <ul className="list-unstyled">
                <li className="mb-5">
                  <h5>Product</h5>
                </li>
                <li className="mb-4 text-milky">Digital Invoice</li>
                <li className="mb-4 text-milky">Insights</li>
                <li className="mb-4 text-milky">Reimbursements</li>
                <li className="text-milky">Virtual Assistant</li>
              </ul>
              <ul className="list-unstyled">
                <li className="mb-5">
                  <h5>Company</h5>
                </li>
                <li className="mb-4 text-milky">About Us</li>
                <li className="mb-4 text-milky">Newsletters</li>
                <li className="mb-4 text-milky">Our Partners</li>
                <li className="text-milky">Our Partners</li>
              </ul>
              <ul className="list-unstyled">
                <li className="mb-5">
                  <h5>Resources</h5>
                </li>
                <li className="mb-4 text-milky">Blog</li>
                <li className="mb-4 text-milky">Pricing</li>
                <li className="mb-4 text-milky">FAQ</li>
                <li className=" text-milky">Events</li>
              </ul>
              <ul className="list-unstyled">
                <li className="mb-5">
                  <h5>Follow Us</h5>
                </li>
                <li className="mb-4 text-milky">LinkedIn</li>
                <li className="mb-4 text-milky">Twitter</li>
                <li className="mb-4 text-milky">Instagram</li>
                <li className=" text-milky">Facebook</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container py-5">
          <p className="text-center text-milky">
            Copyright @ Raybit Technologies 2024. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
