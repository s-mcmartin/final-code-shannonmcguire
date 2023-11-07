import useTitle from '../../hooks/useTitle'
import TransitionEffect from '../../components/transitions/TransitionEffect'
import MainSection from '../../components/MainSection'
import AnimatedText from '../../components/transitions/AnimatedText'
import Bio from '../../components/client-view/about/Bio'
import NumberSummary from '../../components/client-view/about/NumberSummary'
import Skills from '../../components/client-view/about/Skills'
import Courses from '../../components/client-view/about/Courses'
import Experience from '../../components/client-view/about/Experience'

const About = () => {
  useTitle("SM_Portfolio: About Page");

  return <>
  <TransitionEffect />
      <main
        className={`flex w-full flex-col items-center justify-center dark:text-light`}
      >
        <MainSection className="pt-16 xs:px-0">
          <AnimatedText
            text="About Me"
            className="mb-16 !leading-tight sm:mb-8"
          />

          <Bio />
          <NumberSummary />
          <Skills  />
          <Courses />
          <Experience />
        </MainSection>
      </main></>;
};

export default About;
