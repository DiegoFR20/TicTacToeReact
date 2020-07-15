import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Quadrado(props) {
    return (
        <button className="quadrado" onClick={props.clicaMarca}>
            {props.value}
        </button>
    );

}

class Tabuleiro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quadrados: Array(9).fill(null),
            xIsNext: true,
        };
    }

    gerenciaMarca(i) {
        const quadrados = this.state.quadrados.slice();
        if (calculaVencedor(quadrados) || quadrados[i]) {
            return;
        }
        quadrados[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            quadrados: quadrados,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderizaQuadrados(i) {
        return <Quadrado value={this.state.quadrados[i]}
            clicaMarca={() => this.gerenciaMarca(i)}
        />
    }

    render() {
        const vencedor = calculaVencedor(this.state.quadrados);
        let status = 'Próximo Jogador: ' + (this.state.xIsNext ? 'X' : 'O');
        if (vencedor) {
            status = "Vencedor " + vencedor;
        } else {
            status = "Próximo jogaddor: " + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="tabuleiro-row">
                    {this.renderizaQuadrados(0)}
                    {this.renderizaQuadrados(1)}
                    {this.renderizaQuadrados(2)}
                </div>
                <div className="tabuleiro-row">
                    {this.renderizaQuadrados(3)}
                    {this.renderizaQuadrados(4)}
                    {this.renderizaQuadrados(5)}
                </div>
                <div className="tabuleiro-row">
                    {this.renderizaQuadrados(6)}
                    {this.renderizaQuadrados(7)}
                    {this.renderizaQuadrados(8)}
                </div>
            </div>
        );
    }
}

class Jogo extends React.Component {
    render() {
        return (
            <div className="jogo">
                <div className="jogo-board">
                    <Tabuleiro />
                </div>
                <div className="jogo-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

function calculaVencedor(quadrados) {
    const linhas = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < linhas.length; i++) {
        const [a, b, c] = linhas[i];
        if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c]) {
            return quadrados[a];
        }
    }
    return null;
}

ReactDOM.render(
    <Jogo />,
    document.getElementById('root')
);