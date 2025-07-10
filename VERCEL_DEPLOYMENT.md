# Configuração do Deploy na Vercel

## Variáveis de Ambiente Necessárias

Para que a aplicação funcione corretamente na Vercel, você precisa configurar as seguintes variáveis de ambiente no painel da Vercel:

### Firebase Configuration

- `NEXT_PUBLIC_API_KEY`: Sua chave da API do Firebase
- `NEXT_PUBLIC_AUTH_DOMAIN`: Seu domínio de autenticação do Firebase
- `NEXT_PUBLIC_PROJECT_ID`: ID do seu projeto Firebase
- `NEXT_PUBLIC_STORAGE_BUCKET`: Bucket de storage do Firebase
- `NEXT_PUBLIC_MESSAGING_SENDER_ID`: ID do sender de mensagens
- `NEXT_PUBLIC_APP_ID`: ID da aplicação Firebase
- `NEXT_PUBLIC_MEASUREMENT_ID`: ID de medição (opcional)

## Como Configurar

1. Acesse o painel da Vercel
2. Vá para o seu projeto
3. Clique em "Settings"
4. Vá para "Environment Variables"
5. Adicione cada variável listada acima com os valores corretos do seu projeto Firebase

## Problemas Comuns

### Erro de Build

Se você estiver recebendo erros de build relacionados ao `EquipamentExit`, verifique se:

- Todas as variáveis de ambiente estão configuradas
- O arquivo `vercel.json` está presente no projeto
- As configurações do `next.config.ts` estão corretas

### Erro de Runtime

Se a aplicação buildar mas não funcionar em runtime, verifique se:

- As variáveis de ambiente estão configuradas corretamente
- O projeto Firebase está ativo
- As regras de segurança do Firestore estão configuradas adequadamente
