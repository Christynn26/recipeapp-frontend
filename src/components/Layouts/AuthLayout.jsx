import Container from "../Elements/Container/Container";

export default function AuthLayout({ children }) {
  return (
    <>
      <Container>
        <div id="main" className="h-full">
          {children}
          <footer className="flex py-8 items-center justify-center">
            <p>Made with ❤️ by Christine</p>
          </footer>
        </div>
      </Container>
    </>
  )
}