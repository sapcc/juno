```js
import Button from "../Button"

const App = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>open</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

;<App />
```
