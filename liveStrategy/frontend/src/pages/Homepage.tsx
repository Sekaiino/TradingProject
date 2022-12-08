const Homepage = () => {
    return(
        <section className="home">
            <h2>Homepage</h2>
            <fieldset id="intro">
                <legend>Introduction</legend>
                <aside>
                    <p> 
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Ducimus totam sapiente voluptas inventore deserunt. 
                        Sapiente quia quam esse sint deserunt.
                    </p>
                </aside>
            </fieldset>
            <fieldset id="trade">
                <legend>Lasts trades</legend>
                <ul>
                    <li>1st trade</li>
                    <li>2nd trade</li>
                    <li>3rd trade</li>
                    <li>4th trade</li>
                    <li>5th trade</li>
                </ul>
            </fieldset>
        </section>
    )
};

export {Homepage};