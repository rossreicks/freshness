import { Hono } from 'hono'
import Recipes from './api/recipes'


const app = new Hono()
app.get('/', (c) => c.text('Hello Bun!'))

app.route('/recipes', Recipes)

app.all('*', (c) => c.text('Not Found', 404))

export default app
