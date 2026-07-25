import Timeline from "./Timeline";

export default function Hope({ progress }) {
  return (
    <section className="relative h-[300vh] bg-[#F7F5EF]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <Timeline progress={progress} />
      </div>
    </section>
  );
}
