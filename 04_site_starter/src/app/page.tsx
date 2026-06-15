import Navbar from "@/components/Navbar";
import WalkoutIntro from "@/components/WalkoutIntro";
import ReactiveArenaBackground from "@/components/ReactiveArenaBackground";
import Hero from "@/components/Hero";
import LivePanel from "@/components/LivePanel";
import FightsEvents from "@/components/FightsEvents";
import SocialHub from "@/components/SocialHub";
import MediaGrid from "@/components/MediaGrid";
import ContactPanel from "@/components/ContactPanel";
import Footer from "@/components/Footer";
import FightModeTakeover from "@/components/features/FightModeTakeover";
import EasterEggGlitch from "@/components/features/EasterEggGlitch";
import CrashoutBoyzDropSystem from "@/components/features/CrashoutBoyzDropSystem";
import PosterWall3D from "@/components/features/PosterWall3D";
import FanWall from "@/components/features/FanWall";
import SponsorDealPage from "@/components/features/SponsorDealPage";
import ReplayWalkoutButton from "@/components/features/ReplayWalkoutButton";
import PitchTourBar from "@/components/features/PitchTourBar";
import AssetIntegrityLog from "@/components/features/AssetIntegrityLog";
import WaitlistPanel from "@/components/features/WaitlistPanel";


export default function HomePage() {
  return (
    <main className="noise min-h-screen bg-void text-white">
      <WalkoutIntro />
      <AssetIntegrityLog />
      <ReactiveArenaBackground />
      <Navbar />
      <EasterEggGlitch />
      <ReplayWalkoutButton />
      <PitchTourBar />
      <Hero />
      <LivePanel />
      <CrashoutBoyzDropSystem />
      <PosterWall3D />
      <MediaGrid />
      <SocialHub />
      <FightModeTakeover />
      <FightsEvents />
      <FanWall />
      <SponsorDealPage />
      <ContactPanel />
      <WaitlistPanel />
      <Footer />
    </main>
  );
}
