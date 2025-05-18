import SlideShow from './SlideShow';


function Home() {
    return (
        <div className= "body">
            <h1>Bem-vindo ao site do G.D. Estrela do minho</h1>
        <div>
            <SlideShow />
        </div>

        <div>


        </div>



        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/B4IyVkGQNpk?si=qhQES6yHbyqnOx3B"
                title="Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />

        </div>
    </div>
  );
}







export default Home;
