npm run build
tar -czvf dist.tar.gz ./dist
sftp -i /home/ntpl-297/Documents/Project-Docs/mentorship/techclub.pem ubuntu@ec2-65-2-129-210.ap-south-1.compute.amazonaws.com << !
 cd lawoup/backend
 put dist.tar.gz
 bye
!
echo "replacing build"
ssh ubuntu@ec2-65-2-129-210.ap-south-1.compute.amazonaws.com -i /home/ntpl-297/Documents/Project-Docs/mentorship/techclub.pem << !
 export NVM_DIR=~/.nvm
 source ~/.nvm/nvm.sh
 cd lawoup/backend
 rm -rf dist
 tar -xzvf dist.tar.gz
 rm dist.tar.gz
 cp .env* ./dist/
 pm2 restart all
 echo "build completed"
!
rm dist.tar.gz
/usr/bin/printf "\xE2\x9C\x94 build completed\n"
