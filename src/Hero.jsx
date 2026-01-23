const Hero = ({ blok }) => {
  return (
    <section>
      <h1>{blok.title}</h1>
      <p>{blok.description}</p>
    </section>
  );
};

export default Hero;
