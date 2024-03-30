type PageTitleProps = {
    title: string;
};

function PageTitle(props: PageTitleProps) {
    return (
        <h1 data-cy="page-title" className="text-2xl font-bold mb-4">
            {props.title}
        </h1>
    );
}

export default PageTitle;