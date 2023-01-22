import Button from 'components/shared/Button'

export default function Page() {
  return (
    <div className="page">
      Page
      <Button to="/login">Login</Button>
      <Button color="secondary" to="/app">
        Home
      </Button>
    </div>
  )
}
