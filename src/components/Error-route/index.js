import Navigation from "../navigation";
import PageLayout from "../page-layout";
import Head from "../head";

function ErrorRoute() {
    return (
        <PageLayout>
            <Head title='404 Error'/>
            <Navigation/>
            <p>Упс... такой страницы не существует</p>
        </PageLayout>
    )
}

export default ErrorRoute;