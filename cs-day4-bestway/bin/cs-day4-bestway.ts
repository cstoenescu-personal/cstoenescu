#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CsDay4BestwayStack } from '../lib/cs-day4-bestway-stack';
import { CsDay4ec2all } from '../lib/cs-day4-ec2all';

const app = new cdk.App();
new CsDay4BestwayStack(app, 'CsDay4BestwayStack', {
 
  // env: { account: '123456789012', region: 'us-east-1' },
});

new CsDay4ec2all(app, 'CsDay4ec2all', {
 
env: { account: '992382386705', region: 'us-east-1' },

});