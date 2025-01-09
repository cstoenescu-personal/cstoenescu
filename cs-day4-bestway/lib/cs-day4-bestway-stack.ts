import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CsDay4BestwayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // define N array with 2 bucket names
    const bucketNames = ['cs-bucket-day4', 'cs-bucket-day4-1'];
    // loop through the array and create buckets
    bucketNames.forEach((bucketName) => {
      new s3.Bucket(this, bucketName, {
        bucketName: bucketName,
        versioned: true,
        autoDeleteObjects: true,
        removalPolicy: cdk.RemovalPolicy.DESTROY // on cdk destroy it will delete bucket
      });
    });

  // // creating s3 bucket
  // const ashubkt = new s3.Bucket(this,'ashuL2' , {
  //   bucketName: 'cs-bucket-day4',
  //   versioned: true,
  //   autoDeleteObjects: true,
  //   removalPolicy: cdk.RemovalPolicy.DESTROY // on cdk destroy it will delete bucket

 //;
// Output the bucket names
new cdk.CfnOutput(this, 'BucketNames', {
  value: bucketNames.join(', '),
  description: 'The names of the S3 buckets created',
});

  }
}
