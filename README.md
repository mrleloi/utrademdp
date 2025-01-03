# KGI Trader API



## Getting started

We will keep 3 branches as always.
1. DEV: For new requirements and non-urgent CR. <br/>
2. UAT: For UAT deployment. <br/>
3. main: For production deployment. <br/>

## Development flow.

1. New requirements/non-urgent CR. <br/>
Check out "DEV" branch to local workspace and do the code changes accordingly. <br/>
Once completed and tested fine in local, then check into a new feature branch. <br/>
The feature branch name could be composed of "reature/"{ticket-no.} <br/>
Then create a PR to merge the feature branch to the "DEV" <br/>
Please delete the feature branch after merged. <br/>

Once dev is tested okay, then create a PR to merge "DEV" into "UAT". <br/>
Please create a tag(e.g.: u-1.0.1) after merged so that we could track the version in UAT <br/>
We will deploy it into UAT for testing after tag created. <br/>

Once UAT is tested fine and we get approval that we will release soon. Then we could create a PR to merge UAT into main branch. <br/>
and create a new tag(e.g.: p-1.0.1.109) for production release after merged. <br/>
Then we will deploy this version into production. <br/>

2. Bugfix or urgent CR. <br/>
Check out the current production version(e.g.: p-1.0.1.109) into local workspace.<br/>
Fix the bug and get it tested well in local. <br/>
Check it into a new bugfix branch(e.g.: bugfix/{ticket-no.}). <br/>
Then deploy this branch into UAT for verification. <br/>
Once tested okay and get approval that we will release it soon. <br/>
Then create a PR to merge the bugfix branch into main branch and create a new tag. <br/>
Then we will deploy this new version into production.<br/>
Once production is verified okay, then we could cherry pick the bugfix changes into the UAT and DEV branches respectively. <br/>
Then delete the bugfix branch. <br/>
Then deploy the UAT branch into uat environment and deploy the dev into dev environment accordingly.<br/>
