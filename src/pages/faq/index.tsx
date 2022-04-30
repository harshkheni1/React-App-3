import React from 'react';
import { connect } from 'react-redux';
import { Page, Container, Box, Accordion, Heading, Text, AccordionItem, styled, A } from '@/ui-kit';
import { FunctionalPage } from '@/store/service-types';
import Layout from '../../containers/layout';
import { getScopeError } from '@/store/scope-error/helpers';
import { isScopeLoading } from '@/store/scope-loading/helpers';
import { AuthScope } from '@/store/auth/types';
import { RootState } from '@/store/root-reducer';
import { ApiError } from '@/core-types/api-error';
import { nextRedirect } from '../../service/helpers';

export const ContainerStyled = styled(Box)`
  padding: 30px;
  border-radius: 10px;
  box-shadow: 1px 1px 30px rgba(0, 0, 0, 0.12);
  border: none;
  overflow: hidden;
  min-height: 411px;
  margin-bottom: 30px;
  background: white;
  text-align: left;
  @media (max-width: 767px) {
    padding: 15px;
    margin: 0px !important;
    margin-bottom: 30px !important;
  }
`;

export const FAQ: FunctionalPage<{
  errors: ApiError | null;
  loading: boolean;
}> = ({ errors, loading }) => {
  return (
    <Layout>
      <Page>
        <Container>
          <ContainerStyled m={[15, 15, 0]}>
            <Heading as="h5" color="black">
              Filing a Claim
            </Heading>
            <Accordion>
              <AccordionItem title={'What information will I need to file a claim online?'}>
                <Text as="div" measure="sm">
                  You need the following information to file your claim:
                  <ul>
                    <li>Name/Phone of Purchaser</li>
                    <li>
                      Damage Type, Damage Cause, Specific Damage, Damage Location, and an Explanation of the Damage
                    </li>
                    <li>When you noticed the damage</li>
                    <li>
                      Be prepared to submit an itemized invoice (especially if you’re manually adding an item to your
                      contract).
                    </li>
                    <li>Be prepared to upload photos of the damage.</li>
                  </ul>
                </Text>
              </AccordionItem>
              <AccordionItem title={'When do we need you to upload photos?'}>
                <Text as="div" measure="sm">
                  Photos of the furniture tag displaying the model and serial number help us order the correct
                  parts/replacements. A close-up photo of the damage and a photo with the entire piece of furniture help
                  us confirm how to fix your damaged furniture.
                </Text>
              </AccordionItem>
              <AccordionItem title={'When do we need you to upload an invoice?'}>
                <Text as="div" measure="sm">
                  If you’re adding an item that’s missing from your contract, a photo of the sales invoice with that
                  item and the plan is necessary.
                </Text>
              </AccordionItem>
              <AccordionItem title={'Why would I click the Add Missing Item button?'}>
                <Text as="div" measure="sm">
                  If an item isn’t listed under your contract that should be, click Add Missing item to manually add the
                  item. Please note: We also require you to prove that you purchased the item by providing an itemized
                  copy of your invoice from the retailer. Do this in the Upload required documents and photos section of
                  the claim.
                </Text>
              </AccordionItem>
              <Heading as="h5" color="black" mt={40}>
                Setting Up Your Online Account
              </Heading>
              <AccordionItem title={'How do I locate my plan and set up my online account?'}>
                <Text as="div" measure="sm">
                  Click the Already bought a plan, but don’t have an account yet hyperlink to set up your online
                  account.
                </Text>
              </AccordionItem>
              <AccordionItem title={'What information do I need to set up my online account?'}>
                <Text as="div" measure="sm">
                  You’ll need the First and Last Name of the Contract Holder and your zip code, email, phone and/or
                  invoice #.
                </Text>
              </AccordionItem>
              <AccordionItem
                title={
                  'I’ve entered the required information to set up my online account, why didn’t the system locate my contract?'
                }
              >
                <Text as="div" measure="sm">
                  Here are a few hints:
                  <ul>
                    <li>Has your last name changed?</li>
                    <li>Did your spouse, relative or significant other purchase the contract?</li>
                    <li>Did your contact information change?</li>
                    <li>Did you purchase your contract from another protection plan provider?</li>
                  </ul>
                </Text>
              </AccordionItem>
              <AccordionItem title={'I’m still unable to locate my plan. What should I do?'}>
                <Text as="div" measure="sm">
                  <ul>
                    <li>
                      Email{' '}
                      <A color="primaryDark" href="mailto:support@myprotectall.com">
                        support@myprotectall.com
                      </A>{' '}
                      the following information and we’ll help you locate your account:
                      <ul>
                        <li>First Name and Last Name</li>
                        <li>Zip Code</li>
                        <li>Phone Number</li>
                        <li>Invoice #</li>
                        <li>Email Address</li>
                        <li>
                          Please note: If possible, attach a copy of your invoice to your email. It’s helpful if you
                          include the contact information that you had at the date you purchased your contract and your
                          current contact information.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </Text>
              </AccordionItem>
            </Accordion>
            <Heading as="h5" color="black" mt={40}>
              Locating Items on Your Contract
            </Heading>
            <AccordionItem title={'How do I locate the items on my contract?'}>
              <Text as="div" measure="sm">
                Once you’ve setup your online account and connected to your plan(s), your plan items will display in the
                My Plans section, you can click on the <strong>Show Warranty Items</strong> to display the items in your
                plan.
              </Text>
            </AccordionItem>
            <Heading as="h5" color="black" mt={40}>
              Checking Claim Status
            </Heading>
            <AccordionItem title={'How do I check the status of my claim online?'}>
              <Text as="div" measure="sm">
                Log in to your online account and go to the <strong>My Claims</strong> section to see the claim status
                for each item and damage area you reported.
              </Text>
            </AccordionItem>
            <AccordionItem title={'What does “Draft” status mean?'}>
              <Text as="div" measure="sm">
                Draft status means that your claim hasn’t been submitted. If you want to delete your draft claim, click
                the <strong>Delete Draft</strong> button. If you want to submit your claim, click{' '}
                <strong>Continue</strong> to complete and submit your claim.
              </Text>
            </AccordionItem>
            <AccordionItem title={'What if I’m still not sure about my claim status?'}>
              <Text as="div" measure="sm">
                If you need additional information regarding your claim, contact Customer Service at the Toll-Free
                Number listed in your Terms and Conditions.
              </Text>
            </AccordionItem>
          </ContainerStyled>
        </Container>
      </Page>
    </Layout>
  );
};

FAQ.getInitialProps = ({ store, res }) => {
  const {
    app: { isAuthorized },
  } = store.getState();
  if (!isAuthorized) {
    return nextRedirect(res, '/');
  }
};

const mapStateToProps = ({ scopeError, scopeLoading }: RootState) => ({
  errors: getScopeError(scopeError, AuthScope),
  loading: isScopeLoading(scopeLoading, AuthScope),
});

export default connect(mapStateToProps)(FAQ);
