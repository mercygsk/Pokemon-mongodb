const React = require('react');

class Index extends React.Component {
    render() {
        const { pokemon } = this.props;

        const myStyle = {
            color: 'white',
            backgroundColor: 'gray',
        };

        return (
            <div style={myStyle} >
                <h1>See All The Pokemon!</h1>
                <nav>
                    <a href="/pokemon/new">Create a New Pokemon</a>
                </nav>
                <ul>
                    {pokemon.map((pokemon, i) => {
                        return (
                            <ul>
                                <a href={`/pokemon/${pokemon._id}`}>
                                    Name: {pokemon.name}
                                </a> {' '}<img src={pokemon.img} alt="s" /> <br></br>
                                <br />
                                <a href={`/pokemon/${pokemon._id}/edit`}> Edit This Pokemon Character</a>
                                <form action={`/pokemon/${pokemon._id}?_method=DELETE`} method="POST">
                                    <input type="submit" value="DELETE" />
                                </form>
                            </ul>
                        )
                    })
                    }
                </ul>
            </div>
        )
    }
}

module.exports = Index;