## Synopsis

Simple PHP queue manager with four types of sample processes

## Details

Queue manager receives requests with four types of tasks and distributes them among four types of processes/servers

	- Fibonacci resolver: Takes an integer and returns the result of Fibonacci function.
	- Basic arithmetic resolver: Takes basic arithmetic problem and returns the result.
	- Reverse text resolver: Takes mirrored text and returns it reversed.
	- Text encoder: Takes string of text and returns BCrypt encrypted hash.

Each type of process/server runs in several instances. Queue manager decides which instance to use based on availability (meaning that the instance is not processing any task at the time).

## Code example

## Installation

Requirements:
- Git
- VirtualBox
- Vagrant

After that, it only takes one command to set everything up:
```sh
vagrant up
```

## License

MIT

## Author
Andrej Zadnikar
