# tacomail client
Need to receive emails and process them in code?
Here's a simple client library for the [tacomail](https://github.com/oskar2517/tacomail) trashmail api.
## Installation
```
npm i tacomail-client
```
The code is bundled to both CommonJS and ESM module format for easy importing.
The library is written in typescript and therefore fully typed, typedefs are included.
## Usage
Both an OOP and a functional approach are supported.
### Object-Oriented
For OOP, use the exported TacomailClient class and instantiate it.
You may pass it a link to a tacomail instance if you don't want to use the official tacomail.de instance.
```ts
import { TacomailClient } from "tacomail-client";
let client = new TacomailClient("https://yourtacomail.example.com"); // no trailing slash
```
If you want to use the default tacomail.de instance, you can also use the default import.
It's a TacomailClient instance for tacomail.de.
```ts
import client from "tacomail-client";
// client is usable right away!
```
Client has various functions that will return an Inbox instance via which Mail can be received.
I believe a separate documentation for this is not necessary, simply use autocompletion/hinting provided by the typedefs.
### Functional
All things exported by `tacomail-client` aside from TacomailClient are functions that directly wrap the api endpoints.
They are usable without working with classes. Again, simply use IDE type hints or check the typedefs yourself.