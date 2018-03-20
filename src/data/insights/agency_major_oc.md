### Description

The object class treemap displays aggregated `ObligationsIncurredByProgramObjectClass_CPE` values as reported by agencies in their most recent [quarterly File B submission](http://usaspending-submissions.s3-website-us-gov-west-1.amazonaws.com/), grouped by major object class codes.

### Procedure

The object class dollar amounts are calculated using the following procedure:

1. Obtain the agency's [File B](http://usaspending-submissions.s3-website-us-gov-west-1.amazonaws.com/) for the latest available quarter.
    * **Note:** When calculating object class amounts for the Department of Defense, it is also necessary to obtain the File B for the Corps of Engineers - a subtier agency of the Department of Defense that files separately.
2. Determine the major object class code from the `ObjectClass` column in File B.
    * Major object class code is the first character of the `ObjectClass` value, with `0` appended to the end. For example, `1` becomes `10`.
    * When the `ObjectClass` value is four characters long, the major object class code is the second character, with `0` appended to the end.
    * The USAspending web site assigns unknown object classes a major object class code of `00`.
3. The `ObligationsIncurredByProgramObjectClass_CPE` for each available major object class in File B is summed, multiplied by -1, and returned as the dollar amount.
    * This value is multiplied by -1 because agencies report credits as negative values, per federal accounting standards. USAspending multiplies this raw value by -1 for presentational purposes.

Object class titles and descriptions may be found in the [USAspending GitHub repository](https://github.com/fedspendingtransparency/usaspending-website/blob/dev/src/js/dataMapping/agency/objectClassDefinitions.js).

The major object class treemap calculates percentages by dividing each major object class's dollar amount by the total dollar amount of all non-negative major object classes.

### Disclosure about completeness

The USAspending API aggregates every agency's quarterly submission into a single database and performs queries on that. In some cases, spending data relevant to a specific agency may be contained in another agency's submission. As a result, a manual aggregation using only a single agency's submission may not result in the same values as the complete amounts reported by the USAspending API.

