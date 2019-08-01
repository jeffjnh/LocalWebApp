import levenshtein as lev

# seq1 = "test"
# seq2 = "text"

seq1 = "testa12a4"
seq2 = "textb13b4"

print("\nDifference between '%s' & '%s' :  %d characters\n" % (seq1, seq2, lev.get_diff(seq1, seq2)))
print(lev.get_matrix(seq1, seq2), "\n")
print(lev.get_matrix_with_headers(seq1, seq2), "\n")

# python3 src/python/testing.py