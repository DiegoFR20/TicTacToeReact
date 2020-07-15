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
    renderizaQuadrados(i) {
        return <Quadrado value={this.props.quadrados[i]}
            clicaMarca={() => this.props.clicaMarca(i)}
        />
    }

    render() {
        return (
            <div>
                <div className="linha-tabuleiro">
                    {this.renderizaQuadrados(0)}
                    {this.renderizaQuadrados(1)}
                    {this.renderizaQuadrados(2)}
                </div>
                <div className="linha-tabuleiro">
                    {this.renderizaQuadrados(3)}
                    {this.renderizaQuadrados(4)}
                    {this.renderizaQuadrados(5)}
                </div>
                <div className="linha-tabuleiro">
                    {this.renderizaQuadrados(6)}
                    {this.renderizaQuadrados(7)}
                    {this.renderizaQuadrados(8)}
                </div>
            </div>
        );
    }
}

class Jogo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            historico: [{
                quadrados: Array(9).fill(null),
            }],
            numeroJogada: 0,
            xIsNext: true,
        }
    }

    gerenciaMarca(i) {
        const historico = this.state.historico.slice(0, this.state.numeroJogada + 1);
        const atual = historico[historico.length - 1];
        const quadrados = atual.quadrados.slice();
        if (calculaVencedor(quadrados) || quadrados[i]) {
            return;
        }
        quadrados[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            historico: historico.concat([{
                quadrados: quadrados,
            }]),
            numeroJogada: historico.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    pularPara(jogada) {
        this.setState({
            numeroJogada: jogada,
            xIsNext: (jogada % 2) === 0,
        });
    }

    render() {
        const historico = this.state.historico;
        const atual = historico[this.state.numeroJogada];
        const vencedor = calculaVencedor(atual.quadrados);

        const movimentos = historico.map((jogada, movimento) => {
            const desc = movimento ?
                'Ir para movimento #' + movimento :
                'Ir para o inicio do jogo';
            return (
                <li key={movimento}>
                    <button onClick={() => this.pularPara(movimento)}>{desc}</button>
                </li>
            )
        })

        let status;
        if (vencedor) {
            status = 'Vencedor: ' + vencedor;
        } else {
            status = 'Próximo Jogador: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="jogo">
                <div className="jogo-board">
                    <Tabuleiro
                        quadrados={atual.quadrados}
                        clicaMarca={(i) => this.gerenciaMarca(i)}
                    />
                </div>
                <div className="jogo-info">
                    <div>{status}</div>
                    <ol>{movimentos}</ol>
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