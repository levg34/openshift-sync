SSH_APP=$1

ssh -o "StrictHostKeyChecking no" -i keys/id_rsa $SSH_APP 'bash -s' < update.sh
