import numpy as np
import pandas as pd

def get_matrix(seq1, seq2):
    # create matrix with size of seq1 * seq2 + 1 extra row & col for headers
    size_x = len(seq1) + 1
    size_y = len(seq2) + 1
    matrix = np.zeros((size_x, size_y), dtype=int)

    # set outer row & col index for calculations
    for x in range(size_x):
        matrix[x, 0] = x
    for y in range(size_y):
        matrix[0, y] = y
        
    # start from [1,1], check against values to its:
    # left, upper-left, and top cells
    for x in range(1, size_x):
        for y in range(1, size_y):
            # if index of current [x,y] is a match
            if seq1[x-1] == seq2[y-1]:
                matrix[x,y] = min(
                    matrix[x-1, y] + 1,
                    matrix[x-1, y-1],
                    matrix[x, y-1] + 1
                )
            # if index of current [x,y] is NOT a match
            else:
                matrix[x,y] = min(
                    matrix[x-1,y] + 1,
                    matrix[x-1,y-1] + 1,
                    matrix[x,y-1] + 1
                )

    return(matrix)

def get_matrix_with_headers(seq1, seq2):
    col = list(seq1)
    row = list(seq2)
    col.insert(0, '#')
    row.insert(0, '#')
    matrix = get_matrix(seq1, seq2)
    return(pd.DataFrame(matrix, columns=col, index=row))

def get_diff(seq1, seq2):
    matrix = get_matrix(seq1, seq2)
    return(matrix[len(seq1), len(seq2)])