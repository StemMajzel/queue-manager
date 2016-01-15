## Synopsis

Simple NodeJS queue manager with four types of sample processes

## Details

Queue manager receives requests with four types of tasks and distributes them among four types of processes/servers

	- Fibonacci resolver: Takes an integer and returns the result of Fibonacci function.
	- Basic arithmetic resolver: Takes basic arithmetic problem and returns the result.
	- Reverse text resolver: Takes mirrored text and returns it reversed.
	- Text encoder: Takes string of text and returns BCrypt encrypted hash.

Each type of process/server runs in several instances. Queue manager decides which instance to use based on availability (meaning that the instance is not processing any task at the time).

## Installation

Requirements:
- Git
- VirtualBox
- Vagrant

After that, it only takes one command to set everything up (from project root):
```sh
vagrant up
```

## How to use

When Vagrant successfully "ups", login to virtual machine shell

```sh
vagrant ssh
```

and start server

```sh
nodejs /home/vagrant/queue-manager/main.js
```

Your server is now ready to receive 4 types of requests using URI parameters
Request example:

```sh
http://127.0.0.1:8000/?function=returnFibonacci&param=66
```

Server will respond with JSON
Response example:

```sh
{"function":"returnFibonacci","param":"66","job_id":2,"pid":10251,"result":27777890035288}
```

Or you can use super convenient test dashboard. Just browse to
```sh
http://127.0.0.1:8000/test.html
```

## License

MIT

## Author
Andrej Zadnikar
