echo "*****Listing all containers*****"
sudo docker ps --all
echo "*****Deleting container with name=resultsquare-webapp*****"
sudo docker rm -f $(sudo docker ps --filter name=resultsquare-webapp)
echo "*****Listing all images*****"
sudo docker images
echo "*****Deleting images with reference=resultsquare/resultsquare-webapp:latest*****"
sudo docker rmi -f $(sudo docker images --filter reference=resultsquare/resultsquare-webapp:latest)
echo "*****Pull and run new resultsquare-webapp container*****"
sudo docker run -d --name resultsquare-webapp -p 80:80 resultsquare/resultsquare-webapp:latest
echo "*****Closing the connection with ec2 instance*****"
exit
