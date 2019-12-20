# gen-policy

PoC of [Node.js Policies](https://nodejs.org/api/policy.html) generator

Disclaimer:  
**This repository was created as a Proof of Concept(PoC)**. It's not recommended to use it in a production.

## What is Policies?

> Policies are a security feature intended to allow guarantees about what code Node.js is able to load. The use of policies assumes safe practices for the policy files such as ensuring that policy files cannot be overwritten by the Node.js application by using file permissions.
>
> &mdash; [Policies | Node.js v13.5.0 Documentation](https://nodejs.org/api/policy.html)

## Install

```
npm install gen-policy
```

## Usage

To get help, run the following command: `gen-policy --help`

```
gen-policy <entry>

Generate policy

Positionals:
  entry                                                                 [string]

Options:
  --help       Show help                                               [boolean]
  --version    Show version number                                     [boolean]
  --out-file   Output file name                [string] [default: "policy.json"]
  --out-dir    Output directory
               [string] [default: "/Users/leko/.ghq/github.com/Leko/gen-policy"]
  --onerror    Output path            [string] [choices: "exit", "throw", "log"]
  --force, -f  Always override even if output file already exists      [boolean]
```

## Contribution

1. Fork this repository
1. Write your code
1. Run tests
1. Create pull request to master branch

## Development

```
git clone git@github.com:Leko/gen-policy.git
cd gen-policy
npm i
```

### Run tests

`npm test`

### Run `gen-policy` locally

`npx ts-node src/cli/index.ts ...`

## License

This package under [MIT](https://opensource.org/licenses/MIT) license.
