import PageTitle from "../../components/common/page-title/PageTitle";

function NotFound() {
    return (
        <section className="h-full flex flex-col items-center">
            <PageTitle title="Something went wrong ):" />

            <div>
                <span>Maybe...</span>
                <ul className="list-decimal list-inside my-10">
                    <li>The page doesn't exist</li>
                    <li>Wrong property ID </li>
                    <li>Wrong booking ID</li>
                </ul>


            </div>
            <p>Try again later</p>
        </section>
    );
}

export default NotFound;