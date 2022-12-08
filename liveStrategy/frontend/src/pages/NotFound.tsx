import { TbFaceIdError } from 'react-icons/tb';

const NotFound = () => {
    return(
        <article>
            <h3>Error</h3>
            <aside>
                <TbFaceIdError style={{transform: "scale(2)"}} />
                <h2>404 - resource not found</h2>
            </aside>
            <p>
                Sorry ! The resource you are looking for seems to not exist. 
                Please double check your url and if you are sure that it is correct,
                report me your issue.
            </p>
        </article>
    )
}

export { NotFound };