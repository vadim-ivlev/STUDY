# Given a list of daily temperatures, produce a list that, for each day in the input,
# tells you how many days you would have to wait until a warmer temperature.
# If there is no future day for which this is possible, put 0 instead.

# For example, given the list temperatures = [73, 74, 75, 71, 69, 72, 76, 73],
# your output should be [1, 1, 4, 2, 1, 1, 0, 0].

# Note: The length of temperatures will be in the range[1, 30000].
# Each temperature will be an integer in the range[30, 100].


class Solution:

    def dailyTemperatures(self, temperatures):
        """
        :type temperatures: List[int]
        :rtype: List[int]
        """

        def find_day(i, v, tt):
            for k in range(i+1, len(tt)):
                if tt[k] > v:
                    return k
            return i

        def find_day2(i, v, t_d):
            pass

        t_days = {}
        for i, t in enumerate(temperatures):
            if t not in t_days:
                t_days[t] = [i]
            else:
                t_days[t].append(i)

        out = [find_day(i, v, temperatures)-i
               for i, v in enumerate(temperatures)]

        return out


inp = [73, 74, 75, 71, 69, 72, 76, 73]
ans = [1, 1, 4, 2, 1, 1, 0, 0]

sol = Solution()
out = sol.dailyTemperatures(inp)
print(out)
print(ans)
print(out == ans)
