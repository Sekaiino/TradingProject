const Homepage = () => {
    return(
        <section className="home">
            <h2>Homepage</h2>
            <article id="intro">
                <h3>Introduction</h3>
                <aside>
                    <p> 
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Ducimus totam sapiente voluptas inventore deserunt. 
                        Sapiente quia quam esse sint deserunt.
                    </p>
                </aside>
            </article>
            <article id="trade">
                <h3>Lasts trades</h3>
                <ul>
                    <li>1st trade</li>
                    <li>2nd trade</li>
                    <li>3rd trade</li>
                    <li>4th trade</li>
                    <li>5th trade</li>
                </ul>
            </article>
        </section>
    )
};

export {Homepage};