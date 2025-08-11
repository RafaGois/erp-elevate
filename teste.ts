const arr = [
    {name: "teste", path: "/"},
    {name: "teste2", path: "/teste2"},
    {name: "teste3", path: "/teste3"},
]

const path = "/"

const publicRoute = arr.find((route) => route.path === path)

console.log(publicRoute)