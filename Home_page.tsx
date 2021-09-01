
///EDUARDA MACHADO SEVERO


import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import ContatoServico from './src/servico/contato_servico'
import Icon from 'react-native-vector-icons/Ionicons'
import { Contato } from './src/modelo/Contato'
import * as Speech from 'expo-speech';


// métodos da home

export default class App extends React.Component {
  
constructor(props) {
    super(props);
    this.findAllContato() 
    }
    
    state = {
    contato:Contato,
    lista_array_dados_contato: [],
    value: null, 
    Id_pesquisar:null, 
    onChangeText: null,
    formularioId: null,
    formularioNome:null,
    formularioEmail:null,
    formularioNacionalidade:null,
    formularioAtributoEduarda:null
   
    
    }
    
    toSpeak (formularioNome){
        const speech = `contato ${formularioNome} inserido com sucesso!`
        Speech.speak(speech,{
            language:'pt-BR',
            rate:0.5
        })
    }
    //acionado quando o componente e montado
    componentDidMount () {
    this.instanciarContato();
    this.findAllContato ();
    }
    
    //escuta atualizações na lista
    componentDidUpdate (prevProps, prevState) {
    if (prevState.lista_array_dados_contato !== this.state.lista_array_dados_contato) {
    this.findAllContato ();
    }
    }

    findAllContato=()=> {
        ContatoServico.findAll()
        .then((response: any) => {
        this.setState({
        lista_array_dados_contato: response._array,
        isLoading: false,
        })
        }), (error) => {
        console.log(error);
        }
        }


    deleteContato=(id)=> {
    this.findContatoById(id)
    if (this.state.formularioId != null || this.state.formularioId != undefined) {
        ContatoServico.deleteById(id)
    Alert.alert("contato excluido com sucesso: ")
    }
    }
    
    atualizaContato=(item0, item1, item2, item3, item4)=> {
    let contato=new Contato()// cria objeto memória
    contato.id=item0 // seta o atributo nome do objeto 
    contato.nome=item1 // seta o atributo nome do objeto 
    contato.email=item2
    contato.nacionalidade=item3 // seta o atributo nome do objeto 
    contato.AtributoEduarda=item4 // seta o atributo nome do objeto 
    // com o valor(state) do item
  

    ContatoServico.updateByObjeto(contato).then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    // popular o objeto da memória
    Alert.alert("Atualizado"); 
    
    } else {
    Alert.alert("Nome não encontrado")
    }
    }), (error) => {
    console.log(error);
    }
    Alert.alert("Contato atualizado com sucesso! ")
    }
    
    
    insertContato=(item1, item2,item3,item4)=> {
    let contato=new Contato()// cria objeto memória
    contato.nome=item1 // seta o atributo nome do objeto 
    contato.email=item2 // seta o atributo nome do objeto 
    contato.nacionalidade=item3 // seta o atributo nome do objeto 
    contato.AtributoEduarda=item4 // seta o atributo nome do objeto 
    // com o valor(state) do item
    
    // cria um id no banco para persistir o objeto
    const insertId=ContatoServico.addData(contato);
    // testa pra ver se deu certo a criação do id
    if(insertId==null || insertId==undefined){
    Alert.alert("Não foi possivel inserir o novo contato")
    }

    this.setState({
        formularioNome:'',
        formularioEmail:'',
        formularioAtributoEduarda:'',
        formularioNacionalidade:''
        
    })

    this.toSpeak(item1);
    return contato;
    }

    instanciarContato=()=>{
    let contato:Contato=new Contato()// cria objeto memória
    return contato
    }
    
    
    
    findContatoById=(id)=> {
    ContatoServico.findById(id)
    .then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    } else {
    Alert.alert("id não encontrado")
    }
    }), (error) => {
    console.log(error);
    }
    }
    
    localizaContato=(id)=> { 
    ContatoServico.findById(id)
    .then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    let contatopesquisa:Contato=new Contato()// cria objeto memória
    const contatoretorno=response._array.map((item,key)=>{
    contatopesquisa.id=item.id;
    contatopesquisa.nome=item.nome;
    contatopesquisa.email=item.email;
    contatopesquisa.nacionalidade=item.nacionalidade;
    contatopesquisa.AtributoEduarda=item.AtributoEduarda;
    })
    // o SetState abaixo mostra para o usuário o objeto recuperado do banco
    // e atualmente somente em memória 

    this.setState({
    contato:contatopesquisa,
    formularioId: contatopesquisa.id,
    formularioNome:contatopesquisa.nome,
    formularioEmail:contatopesquisa.email,
    formularioNacionalidade:contatopesquisa.nacionalidade,
    formularioAtributoEduarda:contatopesquisa.AtributoEduarda
    })
    // popular o objeto da memória
    //Alert.alert("Atualizado"); 
        } else {
    Alert.alert("Nome Não foi possível atualizar")
    }
    }), (error) => {
    console.log(error);
    }
    }

    
    // fim da parte de funções
    // agora é necessário passar os parametros para a visão através de renderização
    


    // aqui temos a renderização da tela (visão)
    render() {

        //extrai as propriedades entre chaves
        const {contato,lista_array_dados_contato,value,Id_pesquisar,formularioId,formularioNome,formularioEmail,formularioNacionalidade,formularioAtributoEduarda} = this.state;
        // se tivermos contato listados oriundos do banco
        // a lista é mostrada na visão
        //const {animal}=animal;
        
        const contatoList = lista_array_dados_contato.map((item, key) => {
            return (
                <> 
                    <Text >id:{item.id} nome:{item.nome} email:{item.email} nacionalidade:{item.nacionalidade} AtributoEduarda:{item.AtributoEduarda}</Text>
                </>
            )
        })

        return (

            <View style={styles.container}>

                <Text style={{ fontSize: 20, paddingBottom: 20 }}>Crud de Contatos (Eduarda Severo)</Text>

                <TextInput
                    placeholder="digite o id Pesquisar"
                    style={styles.textInput}
                    onChangeText={Id_pesquisar => { this.setState({ Id_pesquisar: Id_pesquisar }) }}
                    value={Id_pesquisar}
                />

                <Text>{formularioId}</Text>
                    
              
                <TextInput
                    placeholder="digite o nome do novo contato"
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioNome => { this.setState({ formularioNome: formularioNome }) }}
                    value={formularioNome}
                />

                <TextInput
                    placeholder="digite o email "
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioEmail => { this.setState({ formularioEmail: formularioEmail }) }}
                    value={formularioEmail}
                    
                />
                 <TextInput
                    placeholder="digite a nacionalidade "
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioNacionalidade=> { this.setState({ formularioNacionalidade: formularioNacionalidade }) }}
                    value={formularioNacionalidade}
                    
                /> 
                
                <TextInput
                placeholder="digite Eduarda"
                style={styles.textInput}
                // a cada letra digitada (change) ajusta o state
                onChangeText={formularioAtributoEduarda=> { this.setState({ formularioAtributoEduarda: formularioAtributoEduarda }) }}
                value={formularioAtributoEduarda}
                
            />


               
                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() =>  {formularioNome == null  ? Alert.alert("O campo de nome não pode ser vazio") :this.insertContato(formularioNome, formularioEmail, formularioNacionalidade, formularioAtributoEduarda)}} style={{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-add" size={30} color="white" />
                    </TouchableOpacity>
                </View>
               

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { formularioId == null  ? Alert.alert("Não tem Objeto para atualizar faça uma pesquisa") :this.atualizaContato(formularioId,formularioNome, formularioEmail, formularioNacionalidade, formularioAtributoEduarda)}} style={{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-refresh" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                <TouchableOpacity onPress={() => { Id_pesquisar == null ? Alert.alert("O campo de id não pode ser vazio") : this.localizaContato(Id_pesquisar) }} style={{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-search" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { formularioId == null ? Alert.alert("O campo de id não pode ser vazio") : this.deleteContato(Id_pesquisar) }} style={{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon  name="md-remove" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                {contatoList}
            </View>
            
        );
    }
    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textInput:{
        alignItems: "center", 
        width: 200, 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1 
    },
    containerTouch:{
        width: 200,
         padding: 10
    }
});