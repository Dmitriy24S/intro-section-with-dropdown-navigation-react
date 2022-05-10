import ClientList from "./ClientList";

const Hero = () => {
  return (
    // hero container
    <section className="hero-contaienr md:flex md:flex-row-reverse max-w-7xl mx-auto md:justify-end md:gap-4">
      {/* hero img */}
      <div className="hero-image-container overflow-hidden max-h-[20rem] md:max-h-[35rem] flex md:w-1/2 md:max-w-[26rem]">
        <img
          src="images/image-hero-mobile.png"
          alt=""
          className="hero-image-mobile object-contain block md:hidden"
        />
        <img
          src="images/image-hero-desktop.png"
          alt=""
          className="hero-image-desktop object-cover hidden md:block"
        />
      </div>
      {/* hero text */}
      <section className="flex flex-col justify-between md:min-h-[35rem] md:w-1/2 ">
        <article className="hero-text-container flex flex-col gap-6 items-center mt-10 max-w-sm mx-auto px-2 md:items-start md:text-left md:gap-10">
          <h1 className="font-bold text-4xl md:text-6xl">Make remote work</h1>
          <p>
            Get your team in sync, no matter your location. Streamline
            processes, create team rituals, and watch productivity soar.
          </p>
          <a
            href="#/"
            className="bg-neutral-900 border-2 border-transparent text-white px-6 py-3 inline-block rounded-2xl font-bold tracking-wider hover:bg-white hover:text-black hover:border-black hover:border-2 hover:font-bold"
          >
            Learn more
          </a>
        </article>
        <ClientList />
      </section>
    </section>
  );
};

export default Hero;
