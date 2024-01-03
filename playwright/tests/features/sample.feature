Feature: Is it Friday yet?
  Everybody wants to know when it's Friday

  Scenario: Sunday isn't Friday
    Given I am on the Google search page
    When I search for "Is it Friday yet?"
    Then I should see "" in the title