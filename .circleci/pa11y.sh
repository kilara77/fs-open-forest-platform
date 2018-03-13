docker-compose run fs-intake-pa11y sudo yarn build-test-pa11y;
pa11yreturncode=$?
if [[ $pa11yreturncode = 0 ]]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi
cd ../docker
docker-compose down
exit $pa11yreturncode
