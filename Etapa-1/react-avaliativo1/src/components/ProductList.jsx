import React, { useState } from "react"
import ProductCard from './ProductCard'

const ProductList = ({nomeLista}) => {
    const [produtos, setProdutos] = useState([])
    const [novoNomeProduto, setNovoNomeProduto] = useState("")
    const [novoPrecoProduto, setNovoPrecoProduto] = useState("")
    const [idEdicao, setIdEdicao] = useState(null)
    const [nomeEdicao, setNomeEdicao] = useState("")
    const [precoEdicao, setPrecoEdicao] = useState("")

    const adicionarProduto = () => {
        if (novoNomeProduto.trim() === "" || novoPrecoProduto.trim() === "") return
        setProdutos([...produtos, {id: Date.now(), name: novoNomeProduto, price: novoPrecoProduto}])
        setNovoNomeProduto("")
        setNovoPrecoProduto("")
    }

    const iniciarEdicao = (id) => {
        setIdEdicao(id)
        let produtoAtual = produtos.find((produto) => produto.id === Number(id))
        setNomeEdicao(produtoAtual.name)
        setPrecoEdicao(produtoAtual.price)
    }

    const salvarEdicao = () => {
        setProdutos(
            produtos.map((produto) => 
                produto.id === idEdicao ? {...produto, name: nomeEdicao, price: precoEdicao} : produto
            )
        )
        setIdEdicao(null)
        setNomeEdicao("")
        setPrecoEdicao("")
    }

    const excluirProduto = (id) => {
        setProdutos(produtos.filter((produto) => produto.id !== id))
    }

    const cancelarEdicao = () => {
        setIdEdicao(null)
        setNomeEdicao("")
        setPrecoEdicao("")
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px"}}>
            <h1>Produtos</h1>
            <h2>{nomeLista}</h2>
            <input 
                type="text" 
                value={novoNomeProduto}
                onChange={(event) => setNovoNomeProduto(event.target.value)}
                placeholder="Digite o nome do produto..."
            />
            <input 
                type="text" 
                value={novoPrecoProduto}
                onChange={(event) => setNovoPrecoProduto(event.target.value)}
                placeholder="Digite o preço do produto..."
            />
            <button onClick={adicionarProduto}>Adicionar Produto</button>
            <ul style={{ listStyle: "none", padding: 0}}>
                {produtos.map((produto) => (
                    <li key={produto.id} style={{ margin: "10px 0"}}>
                        {idEdicao === produto.id ? (
                            <>
                                <input 
                                    type="text" 
                                    value={nomeEdicao}
                                    onChange={(event) => setNomeEdicao(event.target.value)}
                                />
                                <input 
                                    type="text" 
                                    value={precoEdicao}
                                    onChange={(event) => setPrecoEdicao(event.target.value)}
                                />
                                <button onClick={salvarEdicao}>Salvar</button>
                                <a href="#" onClick={cancelarEdicao}>Cancelar</a>
                            </>
                        ) : (
                            <>
                                <ProductCard product={produto}/>
                                <button onClick={() => iniciarEdicao(produto.id)}>Editar</button>
                                <button onClick={() => excluirProduto(produto.id)}>Excluir</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProductList
