import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CsEc2VpcDay3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

// using default vpc 
const vpc = ec2.Vpc.fromLookup(this,'csvpc',{
  isDefault: true
});

  // creating ec2 instance
  const csvm = new ec2.Instance(this,'csvm1',{
    vpc,
    instanceType: new ec2.InstanceType('t2.micro'),
    machineImage: new ec2.AmazonLinuxImage(),
    keyPair: ec2.KeyPair.fromKeyPairName(this,'cskey','splunk-key'),
    //       splunk-key is original key name of aws account
    // so you have to use the same
    instanceName: 'cs-linux-vm'
    // above name of my linux machine 
  });
   
// printing instance ID
new cdk.CfnOutput(this,'csInstanceId', {
  description: 'this will print instance id',
  value: csvm.instanceId
});

// print public dns
new cdk.CfnOutput(this,'csvmpublicdns', {
  value: csvm.instancePublicDnsName
});


  }
}