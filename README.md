# audio-transcription
Criei este projeto para transcrever video aulas em inglês para que possa estudar, utilizando a IA do IBM Watson Speech To Text.

# Requisitos:
- NodeJS versão 16+;
- Conta na IBM, você precisara de suas credenciais na [API - Speech To Text](https://cloud.ibm.com/services/speech-to-text);
- ter o FFMPEG instalado no seu computador;

## Observação:
![image](https://user-images.githubusercontent.com/53787626/181650584-3f538b22-68d9-4265-a456-5ef5658a3fa0.png)
Caso você tenha este erro, substitua "\\"(windows) por "/" (linux e etc);


# Como utilizar:
- Clone o repositório e instale as dependências;
- No env, adicione suas credenciais na IBM que ela fornece ao aceitar o serviço Speech to text;
- No diretório do seu projeto:
  - Você vai precisar criar a pasta data, dentro dela terá que ter outras 3 pastas: converted, filesToConvert e filesTranscriptions:
![image](https://user-images.githubusercontent.com/53787626/179411293-28df25b2-cb1a-4cae-a017-d4a998025ed9.png)

### Para fazer as transcrições basta rodar npm start.




