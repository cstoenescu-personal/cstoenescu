import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CsDay4ec2all extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
  
      // using default vpc 
      const vpc = ec2.Vpc.fromLookup(this, 'csvpc', {
        isDefault: true
      });
  
      // creating security group
      const securityGroup = new ec2.SecurityGroup(this, 'InstanceSecurityGroup', {
        vpc,
        description: 'Allow ssh and http access',
        allowAllOutbound: true
      });
      // allow inbound traffic on port 443(HTTPS) from anywhere
      securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), 'allow https access from anywhere');

      // allow ssh access from anywhere
      securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'allow ssh access from anywhere');

      // allow http access from anywhere
      securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'allow http access from anywhere');
  
      // creating ec2 instance
      const csvm = new ec2.Instance(this, 'csvm1', {
        vpc,
        instanceType: new ec2.InstanceType('t2.micro'),
        machineImage: new ec2.AmazonLinuxImage(),
        keyName: 'splunk-key',
        securityGroup,
        instanceName: 'cs-linux-vm'
      });
     
      // printing instance ID
      new cdk.CfnOutput(this, 'csInstanceId', {
        description: 'this will print instance id',
        value: csvm.instanceId
      });
  
      // print public dns
      new cdk.CfnOutput(this, 'csvmpublicdns', {
        value: csvm.instancePublicDnsName
      });
    }
}