import Header from "../Elements/Header/Header";
import Footer from "../Elements/Footer/Footer";
import Container from "../Elements/Container/Container";

export default function Layout({ children }) {
  return (
    <>
      <Container>
        <Header />
        <div id="main">
          {children}
        </div>
        <Footer />
      </Container>
    </>
  )
}