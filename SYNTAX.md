All syntaxes
------------

This document lists all the high-level syntaxes available on the Formality
language. Every syntax listed below is expanded (desugared) to either a
primitive [FormCore](https://github.com/moonad/formcorejs) term, or to one of
the functions available on the [base
library](https://github.com/moonad/Formality/tree/master/src).

Top-level definition
--------------------

```
name(arg0: type0, arg1: type1): return_type
  return_body

...
```

Formality programs and proofs are composed by a number of top-level definitions
containing a `name`, followed by a number of arguments, followed by a `:`,
followed by a `return_type`, followed by a `return_body`. For example:

```
my_name: String
  "Victor"
```

Creates a top-level definition called `my_name`, of type `String` and value
`"Victor"`. And:

```
get_first(fst: String, snd: String): String
  fst
```

Creates a top-level function called `get_first`, which receives two arguments,
`fst` and `snd` of type `String`, and returns a `String`, which is the first
argument.

Top-level definitions and datatype declarations (described below) are the only
syntaxes that aren't expressions, which mean they can't appear anywhere in the
program and, instead, must appear at the "global scope" of a file.

Lambda
------

```
(x) body
```

A lambda represents an inline function. It is written using a parenthesis,
followed by a name, followed by a closing parenthesis, followed by the function
body. There is no arrow (`=>`) in Formality's lambdas.

Multi-argument lambdas can be written by separating multiple names by commas.
They are expanded to multiple lambdas. For example:

```
(x,y,z) body
```

The code above is the same as:

```
(x) (y) (z) body
```

There are no true multi-argument lambdas in Formality, this syntax is a mere
convenience.

Lambdas can also be written using `<x> body` instead of `(x) body`. You can also
omit the name and write just `() body`. As with applications, difference is
merely stylistic.


Application
-----------

```
func(argm)
```


A function application is written using the conventional mathematical syntax,
`f(x)`. There can be no spaces between the function and the parenthesis, thus,
`f (x)` is not allowed. If you want to apply an bigger expression to an
argument, you can wrap `()` around it. For example: `((x) body)(argm)` would
apply the `(x) body` function to `argm`.

A function application can also be written using `<>` instead of `()`. There is
no difference other than style, but it is usually a good practice to use `<>`
for type arguments.

An application to a hole can also be written as `fn!`, which expands to `fn(_)`.

Like multi-argument lambdas, multi-argument applications can be written using
comma-separated arguments. For example:

```
fn(x,y,z)
```

The code above is expanded to:

```
fn(x)(y)(z)
```

Let
---

```
let x = value
body
```

Let expressions define local values. They allow an expression to be reused
multiple times, and computed only once at runtime. For example:

```
let x = heavy(1000000)
x + x
```

Will only evaluate `heavy(1000000)` once. Since `let` is just an expression, you
can chain it any way you like. A `;` can be used for clarity to separate the
value and the body, and `()` can be used to wrap an inline `let` expression, but
neither are mandatory. 

```
let a = 1
let b = (let x = 2; x)
let c = 3
a + b + c
```

A `let` expression introduces a new variable on the context. That variable will
appear in error messages and is **not** considered equal to the expression it
assigns (for theorem proving and type-aliasing purposes).

Def
---

```
def x = value
body
```

Def expressions also define local values. The only difference is that these
expressions will be expanded at compile-time. In other words, the program below:

```
def x = f(42)
x + x
```

Is identical to:

```
f(42) + f(42)
```

And `f(42)` will be computed twice at runtime. One advantage of `def` is that it
doesn't introduce a new variable to the context, so the type checker will
consider it equal to the expression it binds.

Forall (self-dependent function type)
-------------------------------------

```
self(name: type) body
```

Forall, or Pi, or self-dependent function, is the type of a function. Since
Formality functions are self-dependently typed, you can optionally give a name
to the input variable, and to the value of the function itself. For example,

```
(n: Nat) Vector(Bool, n)
```

Is the type of a function that receives a `n: Nat` and returns a `Vector` of `n`
`Bool`s. And:

```
self(P: (self: Bool) -> Type) (true: P((t,f) t)) (false: P((t,f) f)) P(self)
```

Is the λ-encoded Bool type, usually written as:

```
type Bool {
  true
  false
}
```

If you're not using self-dependent types, you can omit the names, parenthesis
and colon, and write just:

```
Nat -> Nat
```

Which is a function that receives a `Nat` and returns a `Nat`.

Datatype
--------

```
type Name (A: Par0, B: Par1 ...) ~ (i: Idx0, j: Idx1 ...) {
  ctor0(field0: Fld0, field1: Fld1 ...) ~ (i: id0, j: idx1 ...)
  ctor1(field0: Fld0, field1: Fld1 ...) ~ (i: id0, j: idx1 ...)
  ...
}
```

Declares an inductive algebraic datatype. A datatype starts with the `type`
keyword, followed by its name, followed by any number parameters ("static
polymorphic types"), followed by, optionally, `~` and any number of indices
("dynamic polymorphic types"). Then, inside `{}`, it is followed by any number
of constructors. Each constructor is followed by its fields, then, optionally,
`~` and its concrete indices.

As an example, the following type, in Haskell:

```
data List a = Nil | Cons a (List a)
```

Can be written in Formality as:

```
type List (A: Type) {
  nil
  cons(head: A, tail: List(A))
}
```

And the following type, in Agda:

```
data Vector (A : Set) : (len : Nat) -> Set where
  nil  : Vector A zero
  cons : (n : Nat) -> (head : A) -> (tail : Vector A n) -> Vector A (succ n)
```

Can be written in Formality as:

```
type Vector (A: Type) ~ (len: Nat) {
  nil                                      ~ (len: zero)
  cons(n: Nat, head: A, tail: Vector(A,n)) ~ (len: succ(n))
}
```

For more examples, check the common types (Maybe, Either, Nat, Vector, List,
Equal, etc.) on https://github.com/moonad/Formality/tree/master/src.

Case (pattern matching)
-----------------------

```
case expr as name {
  case0: body0
  case1: body1
} : ReturnType
```

Formality's case is the most important syntax of the language, as it allows one
to branch, extract values from datatypes and prove theorems. Unlike most
functional languages, you don't need to write field names on each cases;
instead, fields are automatically bound with the `name.field` name (here, `.` is
just part of the name). The `as name` part is only necessary when the matched
expression isn't a variable. The motive is also optional: if it isn't provided,
it will be replaced by a hole. For example, to sum a list, we write:

```
sum(list: List(Nat)): Nat
  case list {
    nil  : 0
    cons : list.head + sum(list.tail)
  }
```

This is expanded to:

```
sum(list: List(Nat)): Nat
  list<() _>(0, (list.head, list.tail) Nat.add(list.head, sum(list.tail)))
```

Notice that Formality automatically inserts two lambdas on the `cons` case,
binding the `list.head` and `list.tail` names to the list's fields. While the
return type is optional, it is useful when proving theorems. You may also write
a `!` instead of the motive, to ask Formality to try to smartly guess it for
you. For more information on theorem proving, check its tutorial.

Open
----

```
open value
body
```

The `open` syntax is a shortcut for pattern-matching a datatype with only one
constructor. For example, if we have a datatype like:

```
type Vector3D {
  vector(x: Nat, y: Nat, z: Nat)
}
```

Then, the program below:

```
dot(a: Vector3D, b: Vector3D): Nat
  open a
  open b
  (a.x * b.x) + (a.y * b.y) + (a.z * b.z)
```

Is equivalent to:

```
dot(a: Vector3D, b: Vector3D): Nat
  case a {
    vector: case b {
      vector: (a.x * b.x) + (a.y * b.y) + (a.z * b.z)
    }
  }
```

Annotation
----------

```
x :: A
```

An inline type annotation. Has no effect, but can be useful to help the
type-checker when it can't infer a type. For example:

```
let fn = ((x) x + x) :: Nat -> Nat
fn(4)
```

The code above uses an inline annotation to annotate the type of the `(x) x + x`
function named `fn`. 


Goal
----

```
?name
```

A goal can be written as `?` followed by a name. For example, `?help` is a goal
named `help`. Goals are extremelly useful when developing algorithms and proofs,
as they allow you to keep a part of your program incomplete while you work on
the rest. They also allow you to inspect the context and expected type on that
part. For example, if you write:

```
add(a: Nat, b: Nat): Nat
  case a {
    zero: ?hole0
    succ: ?hole1
  }
```

Formality will display:

```
Goal ?hole0:
With type: Nat
With ctxt:
- a: Nat
- b: Nat

Goal ?hole1:
With type: Nat
With ctxt:
- a: Nat
- b: Nat
- a.pred: Nat
```

Notice how it shows the type it expects on each hole (`Nat`), as well as the
context available there. Note also, in particular, how `a.pred` is available on
the `succ` case: that's because `pred` is a field of `Nat.succ`.

Hole
----

```
_
```

A hole is written as a single underscore. It stands for "complete this for me".
Holes are extremely useful to let Formality fill the "obvious" parts of your
program for you. Without holes, Formality would be extremely more verbose. For
example, the list of lists `[[1,2],[3,4]]`, in its full form, would be:

```
List.cons<List(Nat)>(List.cons<Nat>(1, List.cons<Nat>(2, List.nil<Nat>)),
List.cons<List(Nat)>(List.cons<Nat>(3, List.cons<Nat>(4, List.nil<Nat>)),
List.nil<List(Nat)>))
```

With holes, you can write just:

```
List.cons<_>(List.cons<_>(1, List.cons<_>(2, List.nil<_>)),
List.cons<_>(List.cons<_>(3, List.cons<_>(4, List.nil<_>)),
List.nil<_>))
```

Moreover, single holes can be shortened as `!`. So it can also be written as:

```
List.cons!(List.cons!(1, List.cons!(2, List.nil!)),
List.cons!(List.cons!(3, List.cons!(4, List.nil!)),
List.nil!))
```

Of course, in this particular example, we can also use `&`, which stands for
`List.cons!`, and `[]`, which stands for `List.nil!`, and write:

```
(1 & 2 & []) & (3 & 4 & [])
```

And, obviously, we can just use the list notation directly:

```
[[1, 2], [3, 4]]
```

But all the list syntaxes, and many others, use holes under the hoods.

Formality's holes work by unifying immediate values only. That is, whenever
you'd have an error such as:

```
Expected: Bool
Detected: _
```

Formality will replace `_` by `Bool` and try again. That is all it does, which
means it does no complex unification. Turns out this covers all cases required
to keep Formality's syntax clean and free from bloated type annotations, even
things like equality rewrites and vectors, while also keeping the type-checker
fast. But if you want more advanced hole-filling features as seen in Agda or
Idris, Formality won't do that and you need explicit types.

Logging
-------

```
log("foo", "bar")
body
```

The syntax above expands to:

```
Debug.log<_>("foo" | "bar", () body)
```

Formality's `log` feature works like Haskell's `Debug.trace`. It allows you to
print a string at runtime. It is very useful for debugging and inspecting the
execution of an algorithm. Note that the order that `Debug.log`s happen can
change depending on the evaluation strategy used by the target language, so it
isn't deterministic.

Pair extractor
--------------

```
let {x,y} = pair
body
```

The syntax above can be used to extract two elements of a single-constructor
type with two fields (like `Pair`). It desugars to:

```
pair<() _>((x,y) body)
```

### If, then, else

```
if bool then t else f
```

The syntax above is equivalent to a ternary operator. It evaluates the bool `x`
and returns `t` if it is true, `f` otherwise. It expands to:

```
bool<() _>(t, f)
```

Do notation
-----------

```
do NAME {
  statements
}
```

Do blocks, or the do-notation, is extremely useful to "flatten" cascades of
callbacks. In Formality, a `do` block requires the name of a monad and a series
of statements. Inside it, you may use `var x = monad` to bind the result of a
monadic computation to the name `x`. You may also write `monad` directly to
execute a monadic computation and drop the result. You can also use local
`let`s, as you'd expect. It will then be converted to a series of applications
of `Monad.bind` and `Monad.pure`. For example,

```
ask_user_age: IO(Nat)
  do IO {
    var name = IO.get_line("What is your name?")
    IO.print("Welcome, " | name)
    var year = IO.get_line("When you were born?")
    let age = 2020 - Nat.read(year)
    return Nat.read(age)
  }
```

Is converted to:

```
Monad.bind<_>(IO.monad)<_,_>(IO.get_line("What is your name?"), (name)
Monad.bind<_>(IO.monad)<_,_>(IO.print(String.concat("Hello, ", name), ()
Monad.bind<_>(IO.monad)<_,_>(IO.get_line("When you were born?"), (year)
let age = 2020 - Nat.read(year)
Monad.pure<_>(IO.monad)<_>(Nat.read(year))))))
```

Nat literal
-----------

```
42
```

A natural number can be written by its decimal notation. The literal above is
expanded to:

```
Nat.succ(Nat.succ(Nat.succ ... 42 times ... (Nat.zero)))
```

For efficiency purposes, Formality's type-checker keeps `Nat` literals
represented as BigInts until they are needed for type-checking purposes. Also,
Formality compiles every `Nat` (not just literals) to efficient BigInts, when
available on the target language.

Uint literal
------------

```
42b
42s
42u
42l
```

The literals above can be used to create uints of `8`, `16`, `32` and `64` bits
respectivelly. So, for example:

```
num: U32
  42u
```

Is a 32-bit unsigned integer. These aren't primitive either. The code above is
expanded to:

```
num: U32
  Nat.to_u32(42)
```

Which uses the standard library `Nat.to_u32` function to convert a `Nat` to an
`U32`, which is itself represented using the `Word` type, which is itself a list
of bits of statically known length:

```
type Word ~ (size: Nat) {
  e                              ~ (size: Nat.zero),
  o<size: Nat>(pred: Word(size)) ~ (size: Nat.succ(size)),
  i<size: Nat>(pred: Word(size)) ~ (size: Nat.succ(size)),
}
```

Obviously `Nat.to_u32` is optimized by the compiler, so that uint literals
become just numeric literals on the target language.

Char literal
------------

```
'a'
```

A character literal is written with `'`. Characters aren't primitive in
Formality. Instead, they're represented as 16-bit words, using the `Word(16)`
type. As such, the character literal expands to:

```
Word.from_bits<16>(Bits.o(Bits.i(Bits.o(...Bits.e))))
```

For efficiency reasons, Formality's type-checker keeps characters represented as
ints in memory and only unrolls if necessary. Moreover, all characters are
compiled to Uint16 or equivalent when available in the target language.

String literal
--------------

```
"Hello"
```

A string literal is written with `"`. Strings aren't primitives in Formality
either. Instead, they are reprsented as:

```
type String {
  nil,
  cons(head: Char, tail: String),
}
```

Note that Strings aren't the same as `List(Char)`. They're a new datatype in
order to make efficient compilation simpler. Formality's type-checker expands
string literals to strings when needed. For example, `"Hello"` is expanded to:

```
String.cons('h', "ello")
```

If the first character is required for type-checking purposes (such as when
doing a dependent macros, or implementing `printf()`). Strings are compiled to
native strings when available.

String concatenation
--------------------

```
xs | ys
```

The code above expands to:

```
String.concat(xs, ys)
```

It concatenates two strings as one.

New pair
--------

```
{1, "foo"}
```

Pair literals can be used as a shortcut to write pairs. They are expanded to:

```
Pair.new<_,_>(1, "foo")
```

New sigma
---------

```
1 ~ refl
```

Sigma.new literals can be used to write sigmas, or dependent pairs. They are
expanded to:

```
Sigma.new<_,_>(1, refl)
```

With `Sigma.new` as defined on the base libraries.

Sigma type
----------

```
{x: A} B(x)
```

Sigma literals can be used to write sigma types, or dependent pairs. They are
expanded to:

```
Sigma(A, (x) B(x))
```

With `Sigma` as defined in the base libraries. In the same way that forall (aka
Pi, aka the dependent function type) can be read as "forall", Sigmas can be read
as "there exists". So, for example, the program below:

```
there_is_an_even_nat: {x: Nat} (x % 2) == 0
  0 ~ refl
```

Can be read as `there exists a x:Nat such that x mod 2 is equal to zero`. Sigmas
can also be used to create subset types:

```
EvenNat: Type
  {x: Nat} (x % 2) == 0
```

Equal type
----------

```
a == b
```

The syntax above expands to:

```
Equal(_, a, b)
```

It is the type of propositional equality proofs. It is not a boolean equality
operator. 

Not equal type
--------------

```
a != b
```

The syntax above expands to:

```
Not(Equal(_, a, b))
```

It is the type of propositional inequality proofs. It is not a boolean
inequality operator.

Maybe.some
----------

```
some(42)
```

The syntax above expands to:

```
Maybe.some<_>(42)
```

Maybe.none
----------

```
none
```

The syntax above expands to:

```
Maybe.none<_>
```

List literal
------------

```
[1, 2, 3]
```

The syntax above expands to:

```
List.cons<_>(1, List.cons<_>(2, List.cons<_>(3, List.nil<_>)))
```

List consing
------------

```
1 & list
```

The syntax above expands to:

```
List.cons<_>(1, list)
```

It adds an element to the beginning of a list.

List concatenation
------------------

```
xs ++ ys
```

The syntax above expands to:

```
List.concat<_>(xs, ys)
```

It concatenates two lists as one.

Equal.apply
-----------

```
apply(f, e)
```

The syntax above expands to:

```
Equal.apply<_,_,_,f>(e)
```

Equal.rewrite
-------------

```
value :: rewrite x in type with e
```

The syntax above expands to:

```
Equal.rewrite<_,_,_, (x) type>(e, value)
```

Using `Equal.rewrite` as defined on
[Equal.fm](https://github.com/moonad/Formality/blob/master/src/Equal.fm). It
allows rewritting the type of an expression based on an equality proof. For
example, suppose you have the following values in your context:

```
eq: 10 == 5 + 5
xs: Vector(Nat, 10)
```

Then you can use `rewrite` to "cast" the type of `xs`:

```
let ys = xs :: rewrite x in Vector(Nat, x) with e
```

And then you'll have:

```
eq: 10 == 5 + 5
xs: Vector(Nat, 10)
ys: Vector(Nat, 5 + 5)
```

In your context. Notice that `ys` is just `xs`, except with the type changed to
replace `10` by `5 + 5`. You can always rewrite inside types if you have a proof
that the substituted expressions are equal.

For in
------

```
for x in list with state:
  loop
```

The for-in syntax can be used to update a state continuously, for each element
of a list. For example:

```
let sum = 0
for n in [1, 2, 3] with sum:
  sum + n
```

The code above will add all the elements in the `[1,2,3]` list, resulting in
`6`.  Loops aren't primitives. Instead, the code above is expanded to:

```
let sum = 0
List.for(_, [1,2,3], _, 0, (n, sum) Nat.add(sum, n))
```

Let for in
----------

```
for x in list:
  state = loop
```

Similar to the syntax above, but allows you to assign the result of the loop to
a local variable, instead of returning it. For example:

```
let sum = 0
for n in [1, 2, 3]:
  sum = sum + n
sum * 2
```

Adds all the numbers in the `[1, 2, 3]` list, and then returns the double of
that sum (i.e., `12`). It expands to:

```
let sum = 0
let sum = List.for(_, [1,2,3], _, 0, (n,sum) Nat.add(sum, n))
sum
```

For range
---------

```
for x in from .. upto:
  loop
```

Like `for-in`, but operates on numeric ranges instead of lists.

Let for range
-------------

```
for x in from .. upto:
  state = loop
```

Like `let-for-in`, but operates on numeric ranges instead of lists.

Numeric operation
-----------------

```
24 + 24
84 - 24
24 * 2
84 / 2
128 % 43
```

The expressions above are desugared to:

```
Nat.add(24, 24)
Nat.sub(84, 24)
Nat.mul(24, 2)
Nat.div(84, 2)
Nat.mod(128, 43)
```

Operators in Formality have no precedence and are always right associative. That
means, for example, `a * b + c - d` is parsed as `(((a * b) + c) - d)`.
